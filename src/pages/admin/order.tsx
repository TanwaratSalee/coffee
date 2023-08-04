import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
import supabase from "../../../lib/supabase";

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

export default function Order({ postdata }: any) {
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
    <LayoutAdmin>
      <main className="text-topic">
        <h1 className="text-heading text-center font-medium">Order</h1>
        <div>
          {posts?.map((item, id): any => (
            <div className="flex gap-x-[10px]" key={id}>
              <div className="pr-[10px]">{id}</div>
              <div>{item.menu}</div>
              <div>{item.temp}</div>
              <div>{item.shot}</div>
              <div>{item.price}</div>
            </div>
          ))}
        </div>
        <button>เสร็จสิ้น</button>
        <br />
        <button>ยกเลิก</button>
        <h1 className="text-heading text-center font-medium">History</h1>
      </main>
    </LayoutAdmin>
  );
}
