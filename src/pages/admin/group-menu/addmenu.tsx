import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import supabase from "../../../../lib/supabase";

type Error = {
  code: string;
  path: [];
  message: string;
};

interface Addon {
  id: number;
  name: string;
}

interface GroupAddon {
  id: number;
  name: string;
  is_public: boolean;
  add_on: Addon[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: addon } = await supabase.from("group_add_on").select(`
      id,
      name,
      is_public,
        add_on (
          id,
          name
        )   
      )
  
`);
  return { props: { addon } };
};
export default function Addgroup({ addon }: any) {
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
  const [addons, setAddOn] = useState<GroupAddon[]>(addon);
  const [objectgroup, setObjectgroup] = useState<
    { id: number; name: string; check: boolean }[]
  >([]);

  // ค้าใน object ที่ input type check
  // useEffect(() => {
  //   console.log(objectgroup);
  // }, [objectgroup]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`images/${name}${image.name}`, image, { upsert: true });
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
            image_url: imageURL,
          }),
        });
        if (!response.ok) {
          const data = await response.json();
          setErrors(data.errors);
        } else {
          const data = await response.json();
          console.log("data:", data);
          setErrors([]);
          const objecttest = objectgroup.filter((it) => it.check != false);
          if (objecttest) {
            objecttest.forEach(async (value: any, index: any) => {
              console.log(objecttest);
              const response = await fetch("../../api/admin/menu_add_on", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  menu_id: data.data[0].id,
                  group_add_on_id: value.id,
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
            });
          }
        }
      }
    } else {
      router.push("../../admin");
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
          image_url: "images/Nopic.jpeg",
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        const data = await response.json();
        setErrors([]);
        const objecttest = objectgroup.filter((it) => it.check != false);
        if (objecttest) {
          objecttest.forEach(async (value: any, index: any) => {
            console.log(objecttest);
            const response = await fetch("../../api/admin/menu_add_on", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                menu_id: data.data[0].id,
                group_add_on_id: value.id,
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
          });
        }
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileImg = event.target.files?.item(0);
    if (fileImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader, "render");
        setSelectedFileSrc(reader.result);
        setImage(fileImg);
      };
      reader.readAsDataURL(fileImg);
    }
  };

  const handleAddon = (check: boolean, name: string, id: number) => {
    const findDuplicate = objectgroup.find((it) => it.id == id);
    if (findDuplicate) {
      const fileterOtherList = objectgroup.filter((it) => it.id != id);
      setObjectgroup([
        ...fileterOtherList,
        {
          id,
          name,
          check,
        },
      ]);
    } else {
      setObjectgroup((oldState) => {
        return [
          ...oldState,
          {
            id,
            name,
            check,
          },
        ];
      });
    }
    // const test = {[
    //   name : name  ,
    //   id : id,
    //   check  : event,
    // ]}
    // return(...objectgroup, test )
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
            <div
              className={`${
                selectedFileSrc ? "" : "bg-gray-100"
              } flex flex-col items-center justify-center w-[300px] h-[300px]  m-auto `}
            >
              <label
                htmlFor="file-upload"
                className="px-[20px] py-2 font-bold bg-gray-200 rounded-xl border border-black text-gray-800 h-[58px]"
              >
                {buttonText}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden object-contain"
              />
              {selectedFileSrc && (
                <img
                  src={selectedFileSrc as string}
                  alt="Preview"
                  className="mt-4 w-full h-[234px] bg-gray-100 object-contain border-4 border-blue-500 rounded "
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
          <div>
            {addons &&
              addons.map((addon) => (
                <li key={addon.name} className="text-base">
                  <div className="text-maintopic flex justify-between">
                    <div>
                      <input
                        type="checkbox"
                        id="publicCheckbox"
                        name="vehicle1"
                        value="Bike"
                        onChange={(e) => {
                          handleAddon(e.target.checked, addon.name, addon.id);
                        }}
                      ></input>
                      {addon.name}
                    </div>
                  </div>
                </li>
              ))}
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
