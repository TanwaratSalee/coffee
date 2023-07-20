import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export interface Post {
  id: string;
  menu: string;
  temp: string | null;
  shot: string | null;
  note: string | null;
  price: string | null;
  created_at: string;
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: postdata } = await supabase.from("posts").select();

  return { props: { postdata } };
};
export default function Home({ postdata }: any) {
  const [posts, setPosts] = useState<Post[]>(postdata);
  useEffect(() => {
    const channel = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setPosts([...posts, payload.new as Post]);
              break;

            case "UPDATE":
              const _posts = [...posts];
              const updateIndex = _posts.findIndex(
                (post) => post.id === payload.old.id
              );
              _posts[updateIndex] = payload.new as Post;
              setPosts(_posts);
              break;

            case "DELETE":
              setPosts(posts.filter((post) => post.id !== payload.old.id));
              break;

            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [posts]);

  return (
    <section>
      <div>
        <div>
          {posts?.map(({ id, menu }: any) => (
            <div className="flex" key={id}>
              <div className="pr-[10px]">{id}</div>
              <div>{menu}</div>
            </div>
          ))}
        </div>
        <button>เสร็จสิ้น</button>
        <br />
        <button>ยกเลิก</button>
      </div>
    </section>
  );
}
