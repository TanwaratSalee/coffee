import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Error = {
  code: string;
  path: [];
  message: string;
};

export default function addgroup() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price_add_on, setPrice] = useState<number | null>(null);
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
    const response = await fetch("../../api/admin/add-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        detail: detail,
        price_add_on: price_add_on,
        is_public: true,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors);
    } else {
      const data = await response.json();
      setErrors([]);
      console.log("POST: ", data);
    }
  };

  return (
    <main className="text-topic">
      {errors.map((error) => (
        <p key={error.message}>{error.message}</p>
      ))}
      <form onSubmit={onSubmit}>
        <h1 className="text-heading text-center font-medium">Add On</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* <div>
          <label>Detail:</label>
          <input
            type="text"
            name="detail"
            value={detail ?? ""}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div> */}
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price_add_on ?? ""}
            onChange={(e) => setPrice(+e.target.value)}
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
