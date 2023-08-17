import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
import { sendMessageToUUID } from "../../../lib/line";
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
          console.log(payload.new, payload.eventType, "payload");
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

  const handleConfirm = async (
    id: string,
    confirm: boolean,
    menuname: string
  ) => {
    const { data, error } = await supabase
      .from("posts")
      .update({
        confirm: confirm,
      })
      .eq("id", id);
    const { data: posts, error: errorpost } = await supabase
      .from("posts")
      .select()
      .is("confirm", null);
    setPosts(posts as Post[]);
    const userId = localStorage.getItem("userId") || "";
    await sendMessageToUUID(
      userId,
      `${
        confirm
          ? menuname + " ทำเสร็จแล้วจ้า "
          : menuname + " ของหมดขอยกเลิกจ้า"
      }`
    );
  };

  return (
    <LayoutAdmin>
      <div className="max-w-[1110px] m-auto ">
        <main className="text-topic">
          <h1 className="text-heading text-center font-medium py-[40px]">
            Order
          </h1>
          <div className="grid grid-cols-11 text-base justify-center align-center ">
            <h1 className="col-start-2	col-end-4 text-namedrink ">Name</h1>
            <h1 className="col-start-5 text-namedrink ">Add on</h1>
            <h1 className="col-start-7 text-namedrink ">Price</h1>

            {posts?.map((item, id): any => (
              <React.Fragment key={item.id}>
                <div className="col-start-2 col-end-11 border-b border-black pt-[20px]"></div>

                <div
                  className={`${
                    item.confirm ? "" : ""
                  } pt-[30px] col-start-2	col-end-4	h-[150px] place-`}
                >
                  {item.menu}
                </div>

                <div className="col-start-5	">
                  <div className="pt-[30px]">{item.temp}</div>
                  <div className="pt-[10px]">{item.shot}</div>
                  <div className="pt-[10px]">{item.sweet}</div>
                </div>
                <div className="col-start-7	pt-[30px]">{item.price}</div>

                <div className="flex flex-col  col-start-9 col-end-11">
                  <button
                    onClick={async (e) => {
                      handleConfirm(item.id, true, item.menu);
                    }}
                    className=" bg-green-300 h-2/4 w-full rounded-xl mt-[30px]"
                  >
                    Order Ready.
                  </button>
                  <button
                    onClick={(e) => {
                      handleConfirm(item.id, false, item.menu);
                    }}
                    className=" bg-red-300 h-2/4 w-full rounded-xl mt-[10px]"
                  >
                    Cancel Order
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>

          <h1 className="text-heading text-center font-medium"></h1>
        </main>
      </div>
    </LayoutAdmin>
  );
}
