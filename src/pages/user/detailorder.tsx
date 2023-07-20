import SelectMenu from "@/components/SelectMenu";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../../lib/supabase";
interface MenuItem {
  id: number;
  name: string;
}

interface Addon {
  id: number;
  name: string;
  add_on: MenuItem[];
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: addon } = await supabase.from("group_add_on").select(`
  id,
  name,
    add_on (
      id,
      name
    )   
  )
`);
  return { props: { addon } };
};
export default function Detailoreder({ addon }: any) {
  const router = useRouter();
  const [temp, setTemp] = useState("");
  const [shot, setShot] = useState("");
  const [sweet, setSweet] = useState("");
  const [datas, setData] = useState<Addon[]>([]);
  useEffect(() => {
    setData(addon);
  }, [addon]);

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

  const submitorder = async (e: any) => {
    e.preventDefault();
    // เพิ่ม order
    const response2 = await fetch("../../api/admin/order_menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: router.query.menu,
        temp: temp,
        shot: shot,
        sweet: sweet,
        price: router.query.price,
      }),
    });
    console.log(response2);

    if (!response2.ok) {
      const data = await response2.json();
    } else {
      const data = await response2.json();
    }
  };

  return (
    <div className="mx-auto max-w-[1110px]">
      <h1 className="text-[60px]">Detail Order</h1>

      <div className="w-fit m-auto">
        <div className="text-center text-[60px]">{router.query.menu}</div>
        {datas &&
          datas.map((data) => (
            <div key={data.name}>
              <div className="pb-[20px]">{data.name}</div>
              <div className="flex">
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
                        <SelectMenu key={add.name} temp={add.name} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        <div className="pb-[20px]">note</div>
        <input className="w-full max-w-[500px] p-[10px_15px]" type="text" />
        {/* <ButtonSubmit detail={"ยืนยัน"} /> */}
        {/* <div className="pb-[20px]">{router.query.price}</div> */}
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
