import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import supabase from "../../../../lib/supabase";
type Error = {
  code: string;
  path: [];
  message: string;
};

export default function Addgroup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [errors, setErrors] = useState<Error[]>([]);
  const groupid = router.query.groupId;
  const menuname = router.query.menuname;
  const [image, setImage] = useState<any>("");
  const [selectedFileSrc, setSelectedFileSrc] = useState<
    string | ArrayBuffer | null
  >(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`images/${name}${image.name}`, image);
    router.push("../../admin");
    if (error) {
      console.error("Error uploading image:", error);
    } else {
      console.log("Image uploaded successfully:", data);
      const imageURL = data.path;
      const response = await fetch("../../api/admin/add-menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          is_public: true,
          group_id: groupid,
          image_url:
            imageURL != `images/${name}undefined`
              ? imageURL
              : "images/Nopic.jpeg",
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
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFileSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const buttonText = selectedFileSrc ? "Change Picture" : "Upload Picture";

  return (
    <main className="text-maintopic m-[20px]">
      {errors.map((error) => (
        <p key={error.message}>{error.message}</p>
      ))}
      <form onSubmit={onSubmit}>
        <h1 className="text-heading text-center p-[50px_20px]">Add New Menu</h1>
        <Link
          className="absolute right-[70px] top-[70px] text-[50px]"
          href="../../admin"
        >
          <i className="fa fa-times " aria-hidden="true"></i>
        </Link>
        <div className="bg-slate-200 rounded-3xl">
          <h2 className="text-center text-topic pt-[40px] mb-[40px] font-bold">
            {menuname}
          </h2>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col items-center justify-center w-[300px] h-[300px] bg-gray-100 m-auto">
              <label
                htmlFor="file-upload"
                className="px-[20px] py-2 font-bold bg-gray-200 rounded-xl border border-black text-gray-800"
              >
                {buttonText}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFileSrc && (
                <Image
                  width={100}
                  height={100}
                  src={selectedFileSrc as string}
                  alt="Preview"
                  className="mt-4 max-w-md h-auto border-4 border-blue-500 rounded"
                />
              )}
            </div>
            <div>
              <div className="flex justify-center p-[0px_20px_25px_20px] mt-[40px]">
                <label>Name:</label>
                <input
                  className="rounded-md m-[0px_10px]"
                  type="text"
                  name="name"
                  value={name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex justify-center p-[0px_20px_25px_20px]">
                <label>Price:</label>
                <input
                  className="rounded-md ml-[12px]"
                  type="number"
                  name="price"
                  value={price ?? ""}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center p-[20px_10px]">
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
