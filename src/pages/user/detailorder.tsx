import SelectMenu from "@/components/SelectMenu";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  amount: string;
  price: string;
  sweet: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const { data: user } = await supabase.from("users").select(`full_name,uid`);

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

  return { props: { addon, listgroup, menu, id, user } };
};
interface User {
  uid: string;
  full_name: string;
}
interface Prop {
  addon: any;
  listgroup: any;
  menu: any;
  id: string;
  user: User[];
}

export default function Detailoreder({
  addon,
  listgroup,
  menu,
  id,
  user,
}: Prop) {
  const [allmenude, setAllmenude] = useRecoilState(recoilorder);
  const router = useRouter();
  const [users, setUser] = useState(menu);
  const [temp, setTemp] = useState("");
  const [shot, setShot] = useState("");
  const [sweet, setSweet] = useState("");
  const [note, setNote] = useState("");
  const [datas, setData] = useState<Addon[]>(addon);
  const [groups, setGroups] = useState<Listgroup[]>(listgroup);
  const [count, setCount] = useState<number>(1);
  const userId = localStorage.getItem("userId") || "";
  const [fullname, setFullname] = useState(user);

  useEffect(() => {
    const userfilter = user.filter((name: any) => name.uid == userId);
    setFullname(userfilter);
  }, []);

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

  const handleAddMore = (amount: number) => {
    if (count > 1 || (count == 1 && amount == 1)) {
      setCount(count + amount);
    }
  };

  const hanfleSubmitToAdmin = async (e: any) => {
    if (!temp) return alert("Chosee Temperature");
    e.preventDefault();
    // เพิ่ม order
    const response2 = await fetch("../../api/admin/order_menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          full_name: fullname[0].full_name ? fullname[0].full_name : "",
          name: users[0].name ? users[0].name : "",
          temp: temp,
          shot: shot ? shot : "",
          sweet: sweet ? sweet : "",
          note: note ? note : "",
          qty: count ? count : "",
          price: users[0].price ? users[0].price : "",
          uid: userId ? userId : "",
        },
      ]),
    });
    console.log(response2);

    if (!response2.ok) {
      const data = await response2.json();
    } else {
      const data = await response2.json();
    }
    router.push("/user");
  };
  console.log(fullname[0].uid, userId);
  const handleSubmitOrder = (image: any) => {
    if (!temp) {
      alert("Chosee Temperature");
    } else {
      const filterFirstArray = allmenude.order_menu.filter((it) => it.name);
      const newVal = [
        ...filterFirstArray,
        {
          full_name: fullname[0].full_name ? fullname[0].full_name : "",
          name: users[0].name ? users[0].name : "",
          temp: temp,
          shot: shot ? shot : "",
          sweet: sweet ? sweet : "",
          image_url: image ? image : "",
          note: note ? note : "",
          qty: count ? count : "",
          price: users[0].price ? users[0].price : "",
          uid: userId ? userId : "",
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
                className="w-auto h-[400px]  m-auto"
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
              className="pt-[40px] font-light	max-w-[650px] m-auto text-namedrink "
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
          onChange={(e) => {
            setNote(e.target.value);
          }}
          className="w-full max-w-[650px] p-[10px_8px] bg-[#f6f4f4] border border-[#e4e2e2] text-base rounded-xl"
          type="text"
        />
      </div>

      <div className="flex items-center justify-center p-[30px]">
        <button
          className="bg-[#C8E31C] w-[50px] h-[50px] text-namedrink rounded-full"
          onClick={() => handleAddMore(-1)}
        >
          -
        </button>
        <span className="text-[30px] px-[15px] bg-[#f6f4f4] mx-[15px] w-[70px] text-center">
          {count}
        </span>
        <button
          className="bg-[#C8E31C] w-[50px] h-[50px] text-namedrink rounded-full"
          onClick={() => handleAddMore(1)}
        >
          +
        </button>
      </div>

      <div className="max-w-[650px] m-auto pt-[30px] flex flex-col gap-[15px] text-namedrink">
        <button
          className="bg-[#C8E31C] w-full h-[70px] rounded-2xl"
          type="submit"
          onClick={(e) => {
            handleSubmitOrder(users[0].image_url);
          }}
        >
          Add this Order
        </button>
        <div className="flex flex-row gap-[20px]	">
          <button
            onClick={hanfleSubmitToAdmin}
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
