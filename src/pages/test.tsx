import { GetServerSideProps } from "next";
import Error from "next/error";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
export interface Post {
  id: string;
  title: string;
  created_at: string;
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: postdata } = await supabase.from("posts").select();

  return { props: { postdata } };
};
export default function Home({ postdata }: any) {
  // ดึงตรงจาก api ไม่เก็บข้อมูล

  const [posts, setPosts] = useState<Post[]>(postdata);
  const [data, setData] = useState([]) || null;
  const [order, setOrder] = useState("");
  const [errors, setErrors] = useState<Error[]>([]);
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
              setPosts(posts.filter((post: any) => post.id !== payload.old.id));
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/order_list");

      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitorder = async (e: any) => {
    e.preventDefault();
    // เพิ่ม order
    // const response2 = await fetch("../../api/admin/add_order", {
    const response2 = await fetch("../../api/admin/order_menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: order,
        is_public: true,
      }),
    });
    console.log(response2);

    if (!response2.ok) {
      const data = await response2.json();
      setErrors(data.errors);
    } else {
      const data = await response2.json();
      console.log("POST: ", data);
    }
  };

  return (
    <section>
      <div>
        {data && (
          <div>
            {data.map((menu: any, index: number) => (
              <p key={index}>{menu.name}</p>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={submitorder}>
        <h1 className="text-heading text-center font-medium">Add Group</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
        <button className="bg-blue-200 p-[10px_18px] m-2" type="submit">
          Save
        </button>
        <button className="bg-slate-500 p-[10px_18px] m-2">Cancel</button>
      </form>
    </section>
  );
}
