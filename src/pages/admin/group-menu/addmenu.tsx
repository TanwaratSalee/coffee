import { useRouter } from "next/router";

export default function addgroup() {
  const router = useRouter();

  const { groupId } = router.query;

  console.log(groupId);

  return (
    <main className="text-topic">
      <h1 className="text-heading text-center font-medium">Add Menu</h1>
      <h1>Picture</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label>Ddtail:</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="name" />
      </div>
      <button className="bg-blue-200 p-[10px_18px] m-2" type="submit">
        Save
      </button>
      <button className="bg-slate-500 p-[10px_18px] m-2" type="submit">
        Cancel
      </button>
    </main>
  );
}
