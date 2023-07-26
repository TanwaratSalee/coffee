import Link from "next/link";
import { useState } from "react";
import LayoutUser from "../../../components/layout-user";
// import { groups } from "../../../mock-data/data";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import supabase from "../../../lib/supabase";

interface MenuItem {
  id: number;
  name: string;
  is_public: boolean;
  price: number;
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
    menu (
      id,
      name,
      price,
      is_public
    )
  `
    )
    .eq("is_public ", 1)
    .eq("menu.is_public", 1);
  return { props: { group } };
};
const Home = ({ group }: any) => {
  const [typeorder, setTypeorder] = useState("All");
  const [groups, setGroup] = useState<DataItem[] | undefined>([]);
  const handleButtonClick = (buttonName: any) => {
    setTypeorder(buttonName);
  };
  useEffect(() => {
    setGroup(group);
  }, [group]);

  return (
    <LayoutUser>
      <div className="">
        <h1 className="text-center bg-[#212325] text-white text-heading p-[20px]">
          Drink Menu
        </h1>
        <div className="flex items-center ml-[20px] p-[10px] overflow-auto">
          <button
            className="p-[5px_20px] m-[15px] border-[1px] h-[36px] border-black text-center text-base"
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
                className="p-[5px_20px] m-[15px] border-[1px] h-[36px] border-black text-center "
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
                } border border-black rounded-lg p-[20px_25px] m-[35px] `}
              >
                <li className="">
                  <div className="text-topic m-[10px]">{group.name}</div>
                  <div className="flex flex-wrap ">
                    {group.menu.map((menu) => (
                      <Link
                        href={`/user/detailorder?type=${group.name}&menu=${menu.name}&price=${menu.price}`}
                        key={menu.name}
                        className="m-[10px] border border-black rounded-lg p-[20px_25px]"
                      >
                        <div>{menu.name}</div>
                        <div className="text-center">{menu.price}</div>
                      </Link>
                    ))}
                  </div>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </LayoutUser>
  );
};

export default Home;
