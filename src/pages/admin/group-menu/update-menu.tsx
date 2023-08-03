import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import supabase from "../../../../lib/supabase";
interface MeuName {
  id: number;
  name: string;
  price: number;
  image_url: any;
  is_public: boolean;
}
interface DataItem {
  id: number;
  name: string;
  is_public: boolean;
  image_url: any;
  menu: MeuName[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { nameId } = ctx.query;

  const { data: group } = await supabase
    .from("group_menu")
    .select(
      `
    id,
    name,
    is_public,
    menu !inner (
      id,
      name,
      is_public,
      image_url,
      price
    )
  `
    )
    .eq("menu.id", nameId);
  return { props: { group } };
};

const Update = ({ group }: any) => {
  const [groups, setAddon] = useState<DataItem[]>(group);
  const router = useRouter();
  const idname = router.query.nameId;
  const imgname = router.query.imgname;
  const [image_url, setPic] = useState(group[0].image_url);
  const [name, setName] = useState(group[0].name);
  const [price, setPrice] = useState(group[0].price);
  const [selectedFileSrc, setSelectedFileSrc] = useState<
    string | string[] | undefined | ArrayBuffer | null
  >(imgname);
  const submitform = async (e: any) => {
    e.preventDefault();
    // const { data:img, error:errorimg } = await supabase.storage
    // .from("images")
    // .upload(`images/${name}${image.name}`, image);
    router.push("../../admin");
    const { data, error } = await supabase
      .from("menu")
      .update({
        name: name,
        price: price,
        image_url: image_url,
      })
      .eq("id", idname);
    router.push("../../admin");
  };

  const handlename = (value: string) => {
    setName(value);
  };

  const handleprice = (value: string) => {
    setPrice(value);
  };

  const handleimage = (value: string) => {
    setPrice(value);
  };
  const handleFileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFileSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(selectedFileSrc);
  };
  const buttonText = selectedFileSrc ? "Change Picture" : "Upload Picture";
  return (
    <main className="text-maintopic m-[10px]">
      <form onSubmit={submitform}>
        <h1 className="text-heading text-center p-[50px_20px]">Update Menu</h1>
        <Link
          className="absolute right-[70px] top-[70px] text-[50px]"
          href="../../admin"
        >
          <i className="fa fa-times " aria-hidden="true"></i>
        </Link>
        <div className="bg-slate-200 rounded-3xl m-[0px_60px]">
          <ul>
            {groups &&
              groups.map((item) => (
                <div key={item.name}>
                  {item &&
                    item.menu.map((group) => (
                      <div
                        className="flex flex-col items-center justify-center p-[25px_20px]"
                        key={group.name}
                      >
                        <div>
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
                            onChange={handleFileUpdate}
                            className="hidden"
                          />
                          {selectedFileSrc == imgname ? (
                            <Image
                              width={100}
                              height={100}
                              src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${group.image_url}`}
                              alt="Preview"
                              className="mt-4 max-w-md h-auto border-4 border-blue-500 rounded"
                            />
                          ) : (
                            <Image
                              width={100}
                              height={100}
                              src={selectedFileSrc as string}
                              alt="Preview"
                              className="mt-4 max-w-md h-auto border-4 border-blue-500 rounded"
                            />
                          )}
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleimage(e.target.value)}
                            className="hidden"
                          />
                        </div>

                        <div>
                          <label>Name:</label>
                          <input
                            className="rounded-md m-[15px_10px] pl-[20px]"
                            type="text"
                            defaultValue={group.name}
                            onChange={(e) => handlename(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Price:</label>
                          <input
                            className="rounded-md pl-[20px] ml-[13px]"
                            type="text"
                            defaultValue={group.price}
                            onChange={(e) => handleprice(e.target.value)}
                          />
                        </div>
                        {/* <li key={group.name}>{group.name}</li> */}
                      </div>
                    ))}
                </div>
              ))}
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
          </ul>
        </div>
      </form>
    </main>
  );
};

export default Update;
function eq(arg0: string, id: any) {
  throw new Error("Function not implemented.");
}
