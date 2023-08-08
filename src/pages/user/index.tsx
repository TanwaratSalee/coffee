import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      <div>
        <div className="flex">
          <h1 className="text-cente text-heading p-[20px_0px]">Drink Menu</h1>
          <div className="text-topic flex justify-evenly items-center">
            <span>
              <i
                className="fa fa-shopping-cart bg-neutral-200 w-[60px] h-[60px] text-center rounded-md mr-[10px]"
                aria-hidden="true"
              ></i>
            </span>
            <span>
              <i
                className="fa fa-times bg-neutral-200 w-[60px] h-[60px] text-center rounded-md"
                aria-hidden="true"
              ></i>
            </span>
          </div>
        </div>

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
      </div>
    </LayoutUser>
  );
};

export default Home;
