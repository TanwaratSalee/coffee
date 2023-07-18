import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface Error {
  code: string;
  path: [];
  message: string;
}

export default function Addgroup() {
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
    const response = await fetch("../../api/admin/group_add_on", {
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
  };

  return (
    <main className="text-topic">
      {errors.map((error) => (
        <p key={error.message}>{error.message}</p>
      ))}
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
