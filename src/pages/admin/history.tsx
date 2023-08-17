import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
import supabase from "../../../lib/supabase";

export interface Post {
  id: string;
  menu: string;
  temp: string | null;
  shot: string | null;
  sweet: string | null;
  note: string | null;
  price: string | null;
  confirm: boolean | null;
  created_at: string;
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: postdata } = await supabase
    .from("posts")
    .select()
    .not("confirm", "is", null);

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
      <main className="text-topic ">
        <h1 className="text-heading text-center font-medium py-[40px]">
          History
        </h1>
        <div className="grid grid-cols-11 text-base justify-center align-center">
          <h1 className="col-start-3	col-end-4 ">Name</h1>
          <h1 className="col-start-5">Add on</h1>
          <h1 className="col-start-7">Price</h1>
          <h1 className="col-start-8 pl-[30px]">Status</h1>

          {posts?.map((item, id): any => (
            <React.Fragment key={item.id}>
              <div className="col-start-2 col-end-10 border-b border-black pt-[20px]"></div>

              <div
                className={`${
                  item.confirm ? " " : ""
                } pt-[30px] col-start-3 col-end-4	h-[150px] place-`}
              >
                {item.menu}
              </div>
              <div className="col-start-5">
                <div className="pt-[30px]">{item.temp}</div>
                <div className="pt-[10px]">{item.shot}</div>
                <div className="pt-[10px">{item.sweet}</div>
              </div>
              <div className="col-start-7 pt-[30px]">{item.price}</div>
              <button
                className={`col-start-8 h-1/3 w-5/6 rounded-xl pt-[30px] ${
                  item.confirm ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.confirm ? "Confirm" : "Cancel"}
              </button>
            </React.Fragment>
          ))}

          <div></div>
        </div>

        <h1 className="text-heading text-center font-medium"></h1>
      </main>
    </LayoutAdmin>
  );
}
