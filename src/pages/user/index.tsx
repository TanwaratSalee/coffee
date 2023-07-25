import Link from "next/link";
import { useState } from "react";
import LayoutUser from "../../../components/layout-user";
import { groups } from "../../../mock-data/data";

const Home = () => {
  const [typeorder, setTypeorder] = useState("All");
  const handleButtonClick = (buttonName: any) => {
    setTypeorder(buttonName);
  };

  return (
    <LayoutUser>
      <div className="">
        <h1 className="text-center bg-[#212325] text-white text-heading p-[20px]">
          Drink Menu
        </h1>
        <div className="flex items-center ml-[20px] p-[10px] overflow-auto">
          <button
            className="p-[5px_20px] m-[15px] border-[1px] border-black text-center text-base"
            onClick={(e) => {
              handleButtonClick("All");
            }}
          >
            All
          </button>
          {groups.map((group, index) => (
            <button
              // className="pl-[10px] pr-[30px] border-r-[1px] border-[black] last:border-none"
              className="p-[5px_20px] m-[15px] border-[1px] border-[black] text-center "
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
          {groups.map((group) => (
            <div
              key={group.name}
              className={`${
                typeorder == group.name || typeorder == "All" ? "" : "hidden"
              } border border-black rounded-lg p-[20px_25px] m-[35px] `}
            >
              <li className="">
                <div className="text-topic m-[10px]">{group.name}</div>
                <div className="flex flex-wrap ">
                  {group.menus.map((menu) => (
                    <Link
                      href={`/user/detailorder?type=${group.name}&menu=${menu.name}&price=${menu.price}`}
                      key={menu.name}
                      className="m-[10px] border border-black rounded-lg p-[20px_25px]"
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
