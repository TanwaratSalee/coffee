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
    .is("confirm", null);

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

  const handlevonfirm = () => {};

  return (
    <LayoutAdmin>
      <div className="max-w-[1110px] m-auto ">
        <main className="text-topic">
          <h1 className="text-heading text-center font-medium">Order</h1>
          <div className="grid grid-cols-10 text-base justify-center align-center">
            <h1 className="col-start-2	col-end-4 ">Name</h1>
            <h1 className="col-start-5">Add on</h1>
            <h1 className="col-start-6">Price</h1>

            {posts?.map((item, id): any => (
              <React.Fragment key={item.id}>
                <div
                  className={`${
                    item.confirm ? " border-red-500" : "border-green-500"
                  } border col-start-2	col-end-4	h-[150px] place-`}
                >
                  {item.menu}
                </div>
                <div className="col-start-5	">
                  <div>{item.temp}</div>
                  <div>{item.shot}</div>
                  <div>{item.sweet}</div>
                </div>
                <div className="col-start-6	">{item.price}</div>

                <button className="col-start-8 text-green-500">Confirm</button>
                <button className="col-start-9 text-red-500">Cancel</button>
              </React.Fragment>
            ))}
          </div>

          <h1 className="text-heading text-center font-medium"></h1>
        </main>
      </div>
    </LayoutAdmin>
  );
}
