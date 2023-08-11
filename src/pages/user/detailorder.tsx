import SelectMenu from "@/components/SelectMenu";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoilorder } from "../../../atom/recoil";
import supabase from "../../../lib/supabase";
interface MenuItem {
  id: number;
  name: string;
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
  const { menu, price } = ctx.query;

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
  const { data: listgroup } = await supabase
    .from("menu_add_on")
    .select(
      `
      id,
      menu_id,
      menu!inner(
        id,
        name
      ),
      group_add_on_id,
        group_add_on(
          id,
          name
        )
      )
    `
    )
    .eq("menu.name", menu);
  return { props: { addon, listgroup, menu, price } };
};
interface Prop {
  addon: string;
  listgroup: string;
  menu: string;
  price: string;
}
export default function Detailoreder({ addon, listgroup, menu, price }: Prop) {
  const [allmenude, setAllmenude] = useRecoilState(recoilorder);
  const router = useRouter();
  const [temp, setTemp] = useState("");
  const [shot, setShot] = useState("");
  const [sweet, setSweet] = useState("");
  const [datas, setData] = useState<Addon[]>([]);
  const [groups, setGroups] = useState<Listgroup[]>([]);
  useEffect(() => {
    setData(addon);
    setGroups(listgroup);
    console.log(listgroup);
    console.log(addon);
  }, [addon, listgroup]);

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

  // const submitorder = async (e: any) => {
  //   e.preventDefault();
  //   // เพิ่ม order
  //   const response2 = await fetch("../../api/admin/order_menu", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: router.query.menu,
  //       temp: temp ? temp : "",
  //       shot: shot ? shot : "",
  //       sweet: sweet ? sweet : "",
  //       price: router.query.price ? router.query.price : "",
  //     }),
  //   });
  //   console.log(response2);

  //   if (!response2.ok) {
  //     const data = await response2.json();
  //   } else {
  //     const data = await response2.json();
  //   }
  // };

  const submitorder = () => {
    const newVal = [
      ...allmenude.order_menu,
      {
        name: menu ? menu : "",
        temp: temp ? temp : "",
        shot: shot ? shot : "",
        sweet: sweet ? sweet : "",
        price: price ? price : "",
      },
    ];
    setAllmenude({ order_menu: newVal });
    router.push("/user");
  };
  useEffect(() => {
    console.log(allmenude);
  }, [allmenude]);
  return (
    <div className="mx-auto max-w-[1110px] p-[40px_12px]">
      <h1 className="text-[60px]">Detail Order </h1>
      <div className="w-fit m-auto">
        <div className="text-center text-[60px]">{router.query.menu}</div>
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
                                        ? "bg-white bg-opacity-50"
                                        : "bg-none"
                                    }`}
                                    key={i}
                                    onClick={(e) => {
                                      handleButtonSetData(add.name, data.name);
                                    }}
                                  >
                                    <SelectMenu
                                      key={add.name}
                                      temp={add.name}
                                    />
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
      </div>
      <button
        className="bg-blue-200 p-[10px_18px] m-2"
        type="submit"
        onClick={submitorder}
      >
        Save
      </button>
      <button className="bg-slate-500 p-[10px_18px] m-2">Cancel</button>
    </div>
  );
}
