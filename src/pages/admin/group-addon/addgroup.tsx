import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function addgroup() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/admin/group_add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("POST: ", data);
  };

  return (
    <main className="text-topic">
      <form onSubmit={onSubmit}>
        <h1 className="text-heading text-center font-medium">Add Group</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="bg-blue-200 p-[10px_18px] m-2" type="submit">
          Save
        </button>
        <button className="bg-slate-500 p-[10px_18px] m-2">Cancel</button>
      </form>
    </main>
  );
}
