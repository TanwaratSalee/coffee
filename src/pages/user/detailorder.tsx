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
    <div className="mx-auto max-w-[860px]">
      {users &&
        users.map((user: any) => (
          <div key={user.id} className="relative">
            <div>
              <Image
                width={150}
                height={100}
                alt={user.id}
                className="w-4/6 aspect=[3/2] m-auto"
                src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${user.image_url}`}
              />
            </div>
            <div className="font-normal	bg-white w-[350px] h-[80px] rounded-t-[50px] text-center text-[35px] absolute bottom-[-40px] pt-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {user.name}
            </div>
          </div>
        ))}
      <div>
        {groups &&
          groups.map((group) => (
            <div
              key={group.id}
              className="pt-[40px] font-light	max-w-[650px] m-auto text-namedrink"
            >
              {group.group_add_on.name}
              {datas &&
                datas.map((data) => {
                  if (data.name == group.group_add_on.name)
                    return (
                      <div key={data.name}>
                        <div className="flex flex-wrap text-base ">
                          {data.add_on &&
                            data.add_on.map((add, i) => (
                              <div
                                key={add.name}
                                className="flex m-[10px] last:mr-0 "
                              >
                                <button
                                  className={`${
                                    temp == add.name ||
                                    shot === add.name ||
                                    sweet == add.name
                                      ? "bg-[#C8E31C] bg-opacity-50 rounded-2xl"
                                      : "bg-[#f0eeee] rounded-2xl"
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
      <div className="max-w-[650px] m-auto">
        <div className="pb-[20px] font-light text-namedrink">Note</div>
        <input
          className="w-full max-w-[650px] p-[10px_8px] bg-[#f6f4f4] border border-[#e4e2e2] text-base rounded-xl"
          type="text"
        />
      </div>

      <div className="max-w-[650px] m-auto pt-[50px] flex flex-col gap-[15px] text-namedrink">
        <button
          className="bg-[#C8E31C] w-full h-[70px] rounded-2xl"
          type="submit"
          onClick={(e) => {
            submitorder(users[0].image_url);
          }}
        >
          Add this Order
        </button>
        <div className="flex flex-row gap-[20px]	">
          <button
            onClick={submittoadmin}
            className="w-2/4 bg-[#f0eeee] h-[70px] rounded-2xl"
          >
            Check Out Now
          </button>

          <button
            onClick={goback}
            className="w-2/4 bg-[#f0eeee] h-[70px] rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
