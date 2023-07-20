import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutUser from "../../../components/layout-user";
import supabase from "../../../lib/supabase";
interface MenuItem {
  id: number;
  name: string;
}

interface DataItem {
  id: number;
  name: string;
  menu: MenuItem[];
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: group } = await supabase.from("group_menu").select(`
id,
name,
menu (
  id,
  name
)
`);
  return { props: { group } };
};
const Home = ({ group }: any) => {
  const [groups, setGroup] = useState<DataItem[] | undefined>([]);

  const [typeorder, setTypeorder] = useState("Coffee");
  const handleButtonClick = (buttonName: any) => {
    setTypeorder(buttonName);
  };
  useEffect(() => {
    setGroup(group);
  }, [group]);
  return (
    <LayoutUser>
      <div className="">
        Drink Menu
        <div className="flex items-center ml-[20px] p-[10px] overflow-auto">
          {groups &&
            groups.map((group, index) => (
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
          {groups &&
            groups.map((group) => (
              <div
                key={group.name}
                className={`${
                  typeorder == group.name ? "" : "hidden"
                } border border-black rounded-lg p-[30px_25px] m-[35px] `}
              >
                <li className="">
                  <div className="text-topic m-[10px]">{group.name}</div>
                  <div className="flex flex-wrap ">
                    {group &&
                      group.menu.map((menu) => (
                        <Link
                          href={`/user/detailorder?type=${group.name}&menu=${menu.name}&price=${menu.price}`}
                          key={menu.name}
                          className="m-[10px] border border-black rounded-lg p-[30px_25px]"
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
