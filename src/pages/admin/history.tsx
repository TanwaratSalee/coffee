import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
import supabase from "../../../lib/supabase";

export interface Post {
  full_name: string;
  qty: 0;
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
        <div className="grid grid-cols-12 text-base justify-center align-center">
          <div className="col-start-2 text-namedrink pb-[20px]">Name</div>
          <div className="col-start-4	col-end-4 text-namedrink ">Order</div>
          <div className="col-start-6 col-end-7 text-namedrink ">Add on</div>
          <div className="col-start-8 text-namedrink ">Qty</div>
          <div className="col-start-9 text-namedrink ">Price</div>
          <div className="col-start-2 col-end-12 border-t border-black"></div>

          {posts?.map((item, id): any => (
            <React.Fragment key={item.id}>
              {(id == 0 ? true : posts[id - 1].full_name != item.full_name) && (
                <div className="col-start-2 pt-[30px]">{item.full_name}</div>
              )}

              <div
                className={`${
                  item.confirm ? "" : ""
                } pt-[30px] col-start-4	col-end-6	h-[150px] `}
              >
                {item.menu}
              </div>

              <div className="col-start-6	col-end-8">
                <div className="pt-[30px]">Temperature : {item.temp}</div>
                <div className="pt-[10px]">Shot : {item.shot}</div>
                <div className="pt-[10px]">Sweet : {item.sweet}</div>
                <div className="pt-[10px] pb-[20px]">Note : {item.note}</div>
              </div>
              <div className="pt-[30px] col-start-9">{item.qty}</div>

              <div className="col-start-10	pt-[30px]">{item.price}</div>
              <button
                className={`col-start-11 h-1/3 w-5/6 rounded-xl pt-[30px] ${
                  item.confirm ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.confirm ? "Confirm" : "Cancel"}
              </button>
              {(id == posts.length - 1
                ? false
                : posts[id + 1].full_name != item.full_name) && (
                <div className="col-start-2 col-end-12 border-t border-black"></div>
              )}
            </React.Fragment>
          ))}

          <div></div>
        </div>

        <h1 className="text-heading text-center font-medium"></h1>
      </main>
    </LayoutAdmin>
  );
}
