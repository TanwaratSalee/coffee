import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import supabase from "../../../../lib/supabase";

type Error = {
  code: string;
  path: [];
  message: string;
};
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

interface MenuGroupAddon {
  menu_id: number;
  group_add_on_id: number;
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

  const { data: addon } = await supabase.from("group_add_on").select(
    `
    id,
    name,
    is_public
  `
  );

  const { data: menuaddon } = await supabase
    .from("menu_add_on")
    .select(
      `
    menu_id,
    group_add_on_id
  `
    )
    .eq("menu_id", nameId);
  return { props: { group, addon, menuaddon } };
};

const Update = ({ group, addon, menuaddon }: any) => {
  const [menuaddons, setMenuaddon] = useState<MenuGroupAddon[]>(menuaddon);
  const [groups, setAddon] = useState<DataItem[]>(group);
  const router = useRouter();
  const idname = router.query.nameId;
  const imgname = router.query.imgname;
  const [errors, setErrors] = useState<Error[]>([]);

  // const [image_url, setPic] = useState(group[0].image_url);
  const [name, setName] = useState(group[0].menu[0].name);
  const [price, setPrice] = useState(group[0].menu[0].price);
  const [selectedFileSrc, setSelectedFileSrc] = useState<
    string | string[] | undefined | ArrayBuffer | null
  >(imgname);
  const [addons, setAddOn] = useState<GroupAddon[]>(addon);
  const [showaddon, setShowaddon] = useState<
    { id: number; name: string; check: boolean }[]
  >([]);
  const [image, setImage] = useState<any>("");

  //defalut check
  useEffect(() => {
    const addon: any = [];
    addons.forEach((value: any) => {
      const matchaddon = menuaddons.filter(
        (it) => it.group_add_on_id == value.id
      );
      if (matchaddon.length) {
        addon.push({
          ...value,
          check: true,
        });
      } else {
        addon.push({
          ...value,
          check: false,
        });
      }
    });
    setShowaddon(addon);
  }, []);

  const submitform = async (e: any, image: any) => {
    e.preventDefault();
    if (imgname != "images/Nopic.jpeg") {
      const { data: updateimage, error: erupdateimage } = await supabase.storage
        .from("images")
        .remove(`${imgname}` as any);
    }
    if (image != imgname) {
      const { data: changeimg, error: erimg } = await supabase.storage
        .from("images")
        .upload(`images/${name}${image.name}`, image);
    }
    const { data, error } = await supabase
      .from("menu")
      .update({
        name: name,
        price: price,
        image_url: !image.name ? imgname : `images/${name}${image.name}`,
      })
      .eq("id", idname);
    const NewGroup = showaddon.filter((it) => it.check == true);
    NewGroup.forEach(async (checkaddon) => {
      const newMenuaddon = menuaddons.filter(
        (menu) => menu.group_add_on_id == checkaddon.id
      );
      console.log(checkaddon.id, newMenuaddon.length);
      if (!newMenuaddon.length) {
        const response = await fetch("../../api/admin/menu_add_on", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_id: group[0].menu[0].id,
            group_add_on_id: checkaddon.id,
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
    });
    const DeleteGroup = showaddon.filter((it) => it.check == false);
    DeleteGroup.forEach(async (checkaddon) => {
      const DeleteMenuaddon = menuaddons.filter(
        (menu) => menu.group_add_on_id == checkaddon.id
      );
      if (DeleteMenuaddon.length) {
        console.log(group[0].menu[0].id, checkaddon.id);
        const { data: menuData, error: menuError } = await supabase
          .from("menu_add_on")
          .delete()
          .eq("menu_id", group[0].menu[0].id)
          .eq(" group_add_on_id", checkaddon.id);
      }
    });
    router.push("../../admin");
  };

  const handlename = (value: string) => {
    setName(value);
  };
  const handleprice = (value: string) => {
    setPrice(value);
  };

  const handleFileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFileSrc(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddon = (check: boolean, name: string, id: number) => {
    const newArr = showaddon.map((addon) => {
      if (addon.id == id) {
        return {
          ...addon,
          check,
        };
      } else {
        return addon;
      }
    });
    setShowaddon(newArr);
  };
  const buttonText = selectedFileSrc ? "Change Picture" : "Upload Picture";

  return (
    <main className="text-maintopic m-[10px]">
      <form
        onSubmit={(e) => {
          submitform(e, image);
        }}
      >
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
                    item.menu.map((menu) => (
                      <div
                        className="flex flex-col items-center justify-center p-[25px_20px]"
                        key={menu.name}
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
                            className="hidden object-contain"
                          />
                          {selectedFileSrc == imgname ? (
                            <Image
                              width={100}
                              height={100}
                              src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${menu.image_url}`}
                              alt="Preview"
                              className="mt-4 w-full h-[234px] bg-gray-100 object-contain border-4 border-blue-500 rounded "
                            />
                          ) : (
                            <Image
                              width={100}
                              height={100}
                              src={selectedFileSrc as string}
                              alt="Preview"
                              className="mt-4 w-full h-[234px] bg-gray-100 object-contain border-4 border-blue-500 rounded "
                            />
                          )}
                        </div>

                        <div>
                          <label>Name:</label>
                          <input
                            className="rounded-md m-[15px_10px] pl-[20px]"
                            type="text"
                            defaultValue={menu.name}
                            onChange={(e) => handlename(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Price:</label>
                          <input
                            className="rounded-md pl-[20px] ml-[13px]"
                            type="text"
                            defaultValue={menu.price}
                            onChange={(e) => handleprice(e.target.value)}
                          />
                        </div>
                        {/* <li key={group.name}>{group.name}</li> */}
                      </div>
                    ))}
                </div>
              ))}
            <div>
              {showaddon &&
                showaddon.map((addon) => (
                  <li key={addon.name} className="text-base">
                    <div className="text-maintopic flex justify-between">
                      <div>
                        <input
                          type="checkbox"
                          defaultChecked={addon.check}
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
