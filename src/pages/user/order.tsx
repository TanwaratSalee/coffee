import Link from "next/link";
import { useState } from "react";
import LayoutUser from "../../../components/layout-user";
import { groups } from "../../../mock-data/data";
import Detailoreder from "./detailorder";

const Home = () => {
  const [typeorder, setTypeorder] = useState("coffee");
  const handleButtonClick = (buttonName: any) => {
    setTypeorder(buttonName);
  };
  return (
    <LayoutUser>
      <div className="">
        Drink Menu
        <div className="flex items-center ml-[20px] p-[10px] overflow-auto">
          {groups.map((group, index) => (
            <button
              className="pl-[10px] pr-[30px] border-r-[1px] border-[black] last:border-none"
              key={index}
              onClick={(e) => {
                handleButtonClick(group.name);
              }}
            >
              {group.name}
            </button>
          ))}
        </div>
        <ul>
          {/* <div className="flex flex-cols ">
            {groups.map((group) => (
              <div
                key={group.name}
                className="p-[10px] m-[10px] bg-[#212325] text-white"
              >
                {group.id}
              </div>
            ))}
          </div> */}
          {groups.map((group) => (
            <div
              key={group.name}
              className={`${
                typeorder == group.name ? "" : "hidden"
              } border border-black rounded-lg p-[30px_25px] m-[35px] `}
            >
              <li className="">
                <div className="text-topic m-[10px]">{group.name}</div>
                <div className="flex flex-wrap ">
                  {group.menus.map((menu) => (
                    <Link
                      onClick={(e) => {
                        Detailoreder(group.name, menu.name, menu.price);
                      }}
                      key={menu.name}
                      className="m-[10px] border border-black rounded-lg p-[30px_25px]"
                      href={""}
                    >
                      {menu.name}
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
