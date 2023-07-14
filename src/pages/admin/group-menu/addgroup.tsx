import { useState } from "react";

function CreateMenu() {
  const [createValue, setCreateValue] = useState("");

  const SaveCreate = async () => {
    const response = await fetch("../../api/create", {
      method: "POST",
      body: JSON.stringify({ createValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="text-topic">
      <h1 className="text-heading text-center font-medium">Add Group</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={createValue}
          onChange={(e) => setCreateValue(e.target.value)}
        />
      </div>
      <button onClick={SaveCreate} className="bg-blue-200 p-[10px_18px] m-2">
        Save
      </button>
      <button className="bg-slate-500 p-[10px_18px] m-2" type="submit">
        Cancel
      </button>
    </main>
  );
}

export default CreateMenu();
