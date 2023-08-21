import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
import { sendMessageToUUID } from "../../../lib/line";
import supabase from "../../../lib/supabase";

export interface Post {
  full_name: string;
  id: string;
  menu: string;
  temp: string | null;
  shot: string | null;
  sweet: string | null;
  qty: 0;
  note: string | null;
  price: string | null;
  confirm: boolean | null;
  created_at: string;
  uid: string;
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

  const handleConfirm = async (
    id: string,
    confirm: boolean,
    menuname: string,
    full_name: string,
    uid: string
  ) => {
    if (!confirm) {
      const { data, error } = await supabase
        .from("posts")
        .update({
          confirm: false,
        })
        .eq("id", id);
    } else {
      const { data, error } = await supabase
        .from("posts")
        .update({
          confirm: true,
        })
        .eq("full_name", full_name);
    }

    const { data: posts, error: errorpost } = await supabase
      .from("posts")
      .select()
      .is("confirm", null);
    setPosts(posts as Post[]);

    await sendMessageToUUID(
      uid,
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
        <main className="text-topic text-center">
          <h1 className="text-heading text-center font-medium py-[40px]">
            Order
          </h1>
          <div className="grid grid-cols-12 text-base justify-center align-center ">
            <div className="col-start-2 text-namedrink pb-[20px]">Name</div>
            <div className="col-start-4	col-end-4 text-namedrink ">Order</div>
            <div className="col-start-6 col-end-7 text-namedrink ">Add on</div>
            <div className="col-start-8 text-namedrink ">Qty</div>
            <div className="col-start-9 text-namedrink ">Price</div>
            <div className="col-start-2 col-end-12 border-t border-black pt-[20px]"></div>

            {posts?.map((item, i): any => (
              <React.Fragment key={item.id}>
                {(i == 0 ? true : posts[i - 1].full_name != item.full_name) && (
                  <div className="col-start-2 pt-[30px]">{item.full_name}</div>
                )}
                <div
                  className={`${
                    item.confirm ? "" : ""
                  } pt-[30px] col-start-4	col-end-6	h-[150px] place-`}
                >
                  {item.menu}
                </div>

                <div className="col-start-6	col-end-7">
                  <div className="pt-[30px]">Temperature : {item.temp}</div>
                  <div className="pt-[10px]">Shot : {item.shot}</div>
                  <div className="pt-[10px]">Sweet : {item.sweet}</div>
                  <div className="pt-[10px]">Note : {item.note}</div>
                </div>
                <div className="pt-[30px] col-start-8">{item.qty}</div>

                <div className="col-start-9	pt-[30px]">{item.price}</div>

                <div className="flex flex-col  col-start-10 mr-[10px]">
                  {/* <button
                    onClick={async (e) => {
                      handleConfirm(item.id, true, item.menu);
                    }}
                    className=" bg-green-300 h-2/4 w-full rounded-xl mt-[30px]"
                  >
                    Order Ready
                  </button> */}
                  <button
                    onClick={(e) => {
                      handleConfirm(
                        item.id,
                        false,
                        item.menu,
                        item.full_name,
                        item.uid
                      );
                    }}
                    className=" bg-red-300 h-3/4 w-full rounded-xl "
                  >
                    Cancel Order
                  </button>
                </div>
                {(i == 0 ? true : posts[i - 1].full_name != item.full_name) && (
                  <button
                    onClick={async (e) => {
                      handleConfirm(
                        item.id,
                        true,
                        item.menu,
                        item.full_name,
                        item.uid
                      );
                    }}
                    className="col-start-11 h-3/4 bg-green-300 w-full rounded-xl "
                  >
                    All order ready
                  </button>
                )}

                {(i == posts.length - 1
                  ? false
                  : posts[i + 1].full_name != item.full_name) && (
                  <div className="col-start-2 col-end-12 border-t border-black pt-[20px]"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <h1 className="text-heading text-center font-medium"></h1>
        </main>
      </div>
    </LayoutAdmin>
  );
}
