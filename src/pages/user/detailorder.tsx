import SelectMenu from "@/components/SelectMenu";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { recoilorder } from "../../../atom/recoil";
import supabase from "../../../lib/supabase";
interface MenuItem {
  id: number;
  name: string;
  image_url: string;
}

interface Listgroup {
  id: number;
  menu_id: number;
  group_add_on_id: number;
  menu: { id: number; name: string };
  group_add_on: { id: number; name: string };
}
interface Addon {
  id: number;
  name: string;
  add_on: MenuItem[];
}

interface Postorder {
  name: string;
  menu: string;
  tem: string;
  shot: string;
  note: string;
  price: string;
  sweet: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const { data: addon } = await supabase.from("group_add_on").select(
    `
  id ,
  name,
    add_on (
      id,
      name
    )   
  )
`
  );
  const { data: menu } = await supabase.from("menu").select().eq("id", id);
  const { data: listgroup, error } = await supabase
    .from("menu_add_on")
    .select(
      `
  id,
  menu_id,
  menu(
    name
  ),
  group_add_on_id,
    group_add_on(
      name
    )
  )
`
    )
    .eq("menu_id", id);

  return { props: { addon, listgroup, menu, id } };
};
interface Prop {
  addon: any;
  listgroup: any;
  menu: any;
  id: string;
}
export default function Detailoreder({ addon, listgroup, menu, id }: Prop) {
  const [allmenude, setAllmenude] = useRecoilState(recoilorder);
  const router = useRouter();
  const [users, setUser] = useState(menu);
  const [temp, setTemp] = useState("");
  const [shot, setShot] = useState("");
  const [sweet, setSweet] = useState("");
  const [datas, setData] = useState<Addon[]>(addon);
  const [groups, setGroups] = useState<Listgroup[]>(listgroup);

  const handleButtonSetData = (buttonName: any, type: any) => {
    if (type == "Temperature") {
      setTemp(buttonName);
    }
    if (type == "Sweet") {
      setSweet(buttonName);
    }
    if (type == "Shot") {
      setShot(buttonName);
    }
  };

  const submittoadmin = async (e: any) => {
    if (!temp) return alert("Chosee Temperature");
    e.preventDefault();
    // เพิ่ม order
    const response2 = await fetch("../../api/admin/order_menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: users[0].name ? users[0].name : "",
        temp: temp,
        shot: shot ? shot : "",
        sweet: sweet ? sweet : "",
        price: users[0].price ? users[0].price : "",
      }),
    });

    if (!response2.ok) {
      const data = await response2.json();
    } else {
      const data = await response2.json();
    }
  };

  const submitorder = (image: any) => {
    if (!temp) {
      alert("Chosee Temperature");
    } else {
      const newVal = [
        ...allmenude.order_menu,
        {
          name: users[0].name ? users[0].name : "",
          temp: temp,
          shot: shot ? shot : "",
          sweet: sweet ? sweet : "",
          image_url: image ? image : "",
          price: users[0].price ? users[0].price : "",
        },
      ];
      setAllmenude({ order_menu: newVal as any });
      router.push("/user");
    }
  };

  const goback = () => {
    router.push("/user");
  };

  return (
    <div className="mx-auto max-w-[1130px]">
      {users &&
        users.map((user: any) => (
          <div key={user.id} className="relative ">
            <div>
              <Image
                width={300}
                height={200}
                alt={user.id}
                className=" "
                src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${user.image_url}`}
              />
            </div>
            <div className="bg-white w-[330px] h-[80px] rounded-t-[50px] text-center text-[40px] absolute bottom-[-40px] pt-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {user.name}
            </div>
          </div>
        ))}
      <div>
        {groups &&
          groups.map((group) => (
            <div key={group.id}>
              {group.group_add_on.name}
              {datas &&
                datas.map((data) => {
                  if (data.name == group.group_add_on.name)
                    return (
                      <div key={data.name}>
                        <div className="flex flex-wrap">
                          {data.add_on &&
                            data.add_on.map((add, i) => (
                              <div key={add.name} className="flex mb-[10px]">
                                <button
                                  className={`${
                                    temp == add.name ||
                                    shot === add.name ||
                                    sweet == add.name
                                      ? "bg-[#C49451] bg-opacity-50"
                                      : "bg-none"
                                  }`}
                                  key={i}
                                  onClick={(e) => {
                                    handleButtonSetData(add.name, data.name);
                                  }}
                                >
                                  <SelectMenu key={add.name} temp={add.name} />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                })}
            </div>
          ))}
      </div>
      <div className="pb-[20px]">note</div>
      <input className="w-full max-w-[500px] p-[10px_15px]" type="text" />

      <button
        onClick={submittoadmin}
        className="bg-slate-500 p-[10px_18px] m-2 "
      >
        Check Out Now
      </button>
      <button
        className="bg-blue-200 p-[10px_18px] m-2"
        type="submit"
        onClick={(e) => {
          submitorder(users[0].image_url);
        }}
      >
        Add this Order
      </button>
      <button onClick={goback} className="bg-slate-500 p-[10px_18px] m-2 ">
        Cancel
      </button>
    </div>
  );
}
