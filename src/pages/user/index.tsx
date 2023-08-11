import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { recoilorder } from "../../../atom/recoil";
import LayoutUser from "../../../components/layout-user";
import supabase from "../../../lib/supabase";

interface MenuItem {
  id: number;
  name: string;
  is_public: boolean;
  price: number;
  image_url: string;
}

interface DataItem {
  id: number;
  name: string;
  menu: MenuItem[];
  price: number;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: group } = await supabase
    .from("group_menu")
    .select(
      `
    id,
    name,
    is_public,
    menu!inner (
      id,
      name,
      price,
      is_public,
      image_url
    )
  `
    )
    .eq("is_public ", 1)
    .eq("menu.is_public", 1);
  return { props: { group } };
};
const Home = ({ group }: any) => {
  const [orderuser, setOrderuser] = useState(recoilorder);
  const [typeorder, setTypeorder] = useState("All");
  const [groups, setGroup] = useState<DataItem[] | undefined>([]);
  const [showorder, setShoworder] = useState(false);
  const handleButtonClick = (buttonName: any) => {
    setTypeorder(buttonName);
  };
  useEffect(() => {
    setGroup(group);
  }, [group]);

  const handleYourOrder = () => {
    setShoworder((value) => !value);
  };

  return (
    <LayoutUser>
      <div className="max-w-[1110px] m-auto ">
        <h1 className="text-cente text-heading p-[20px_0px]">Drink Menu</h1>

        <div className="flex items-center m-[20px] text-base  border-black border-[1px] rounded-xl overflow-auto">
          <button
            className="text-center p-[1px_40px] my-[8px]"
            onClick={(e) => {
              handleButtonClick("All");
            }}
          >
            All
          </button>
          {groups &&
            groups.map((group, index) => (
              <button
                // className="pl-[10px] pr-[30px] border-r-[1px] border-[black] last:border-none"
                className="border-l-[1px] border-black text-center p-[1px_40px] my-[8px]"
                key={index}
                onClick={(e) => {
                  handleButtonClick(group.name);
                }}
              >
                {group.name}
                {/* {index} */}
              </button>
            ))}
        </div>
        <ul>
          {groups &&
            groups.map((group) => (
              <div
                key={group.name}
                className={`${
                  typeorder == group.name || typeorder == "All" ? "" : "hidden"
                } border border-black rounded-lg p-[20px_25px] m-[35px]`}
              >
                <li className="">
                  <div className="text-topic m-[10px]">{group.name}</div>
                  <div className="flex items-center m-[20px] text-base  border-black border-[1px] rounded-xl overflow-auto ">
                    {group.menu.map((menu) => (
                      <Link
                        href={`/user/detailorder?type=${group.name}&menu=${menu.name}&price=${menu.price}`}
                        key={menu.name}
                        className="m-[10px] border border-black rounded-lg p-[7px]"
                      >
                        <img
                          className="w-[150px] h-[150px]"
                          src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${menu.image_url}`}
                        />
                        <div className="w-[150px] text-center ">
                          {menu.name}
                        </div>
                        <div className="text-center">{menu.price}-</div>
                      </Link>
                    ))}
                  </div>
                </li>
              </div>
            ))}
        </ul>
        <div
          className={`${
            showorder
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  "
              : " top-[calc(100%-0px)] left-1/2 -translate-x-1/2 -translate-y-0 "
          }fixed h-[calc(100vh-200px)] duration-1000  w-[90vw] max-w-[1110px] rounded-t-lg text-center bg-amber-200	`}
          onClick={handleYourOrder}
        >
          <div className="rounded-t-lg text-center text-base bg-amber-200 absolute w-[150px] p-[17px_35px] top-[-45px] right-[0px]">
            Your Order
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Home;
