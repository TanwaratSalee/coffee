import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Error = {
  code: string;
  path: [];
  message: string;
};

export default function AddgroupMenu() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Error[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUser = async () => {
      const response = await fetch(`/api/admin/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const user = await response.json();
      setName(user?.name);
    };

    fetchUser();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("../../api/admin/group-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        is_public: true,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors);
    } else {
      const data = await response.json();
      console.log("POST: ", data);
    }
    router.push("../../admin");
  };

  return (
    <main className="text-maintopic m-[10px]">
      {errors.map((error) => (
        <p key={error.message}>{error.message}</p>
      ))}
      <form onSubmit={onSubmit}>
        <h1 className="text-heading text-center p-[50px_20px]">
          Add Drink Menu Group{" "}
        </h1>
        <Link
          className="absolute right-[70px] top-[70px] text-[50px] "
          href="../../admin"
        >
          <i className="fa fa-times " aria-hidden="true"></i>
        </Link>
        <div className="bg-slate-200 rounded-3xl m-[0px_60px]">
          <div className="flex justify-center pt-[50px]">
            <label>Name:</label>
            <input
              className="rounded-md m-[0px_10px]"
              type="text"
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-center p-[40px_20px]">
            <button
              className="bg-blue-200 w-[140px] h-[50px] text-center mr-[10px]"
              type="submit"
            >
              Save
            </button>
            <button className="bg-slate-500 w-[140px] h-[50px] text-center ml-[10px]">
              <Link href="../../admin">Cancel</Link>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
