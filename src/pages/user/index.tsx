import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
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
  const [allmenude, setAllmenude] = useRecoilState(recoilorder);
  const [typeorder, setTypeorder] = useState("All");
  const [groups, setGroup] = useState<DataItem[] | undefined>([]);
  const [showorder, setShoworder] = useState(false);
  const handleButtonClick = (buttonName: any) => {
    setTypeorder(buttonName);
  };
  useEffect(() => {
    setGroup(group);
    console.log(allmenude);
  }, [group]);

  const handleYourOrder = () => {
    setShoworder((value) => !value);
  };

  const submitorder = async (e: any) => {
    e.preventDefault();
    // เพิ่ม order

    allmenude.order_menu.forEach(async (value: any) => {
      const response2 = await fetch("../../api/admin/order_menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value.name ? value.name : "",
          temp: value.temp ? value.temp : "",
          shot: value.shot ? value.shot : "",
          sweet: value.sweet ? value.sweet : "",
          price: value.price ? value.price : "",
        }),
      });

      if (!response2.ok) {
        const data = await response2.json();
      } else {
        const data = await response2.json();
      }
    });
  };

  return (
    <LayoutUser>
      <div className="max-w-[1080px] m-auto ">
        <div className="p-[60px_0px_30px_0px] flex flex-col justify-center items-center">
          <h1 className="text-heading font-medium	lg:text-[80px]">CJ WORX</h1>
          <h3 className="pt-[5px] font-normal	text-maintopic lg:text-[30px]">
            CAFE
          </h3>
        </div>
        <div className="flex items-center pl-[30px] text-base overflow-auto">
          <button
            className="text-center text-black p-[3px_25px] font-light bg-[#e9dbd0] hover:bg-[#9a7e56] hover:font-normal  hover:text-white rounded-3xl mr-[20px] lg:text-[25px] lg:p-[7px_30px] hover:lg:text-[30px] hover:lg:p-[10px_35px]"
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
                className="text-center text-black p-[4px_25px] font-light bg-[#e9dbd0] hover:bg-[#9a7e56] hover:text-white	hover:font-normal	rounded-3xl mr-[20px] last:mb-0 lg:text-[25px] lg:p-[7px_30px] hover:lg:text-[30px] hover:lg:p-[10px_35px]"
                key={group.id}
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
                  typeorder == group.name || typeorder == "All" ? "" : "hidden"
                } pt-[20px]`}
              >
                <li className="">
                  <div className="text-[40px] px-[20px] font-medium	">
                    {group.name}
                  </div>
                  <div className="flex items-center px-[20px] text-base overflow-auto ">
                    {group.menu.map((menu, index) => (
                      <Link
                        href={`/user/detailorder?id=${menu.id}`}
                        // href={`/user/detailorder?type=${group.name}&menu=${menu.name}&price=${menu.price}`}
                        key={index}
                        className="p-[10px] text-white border border-black bg-[#212325] h-[230px] w-[150px] rounded-lg mr-[15px] last:mb-0 lg:h-[290px] lg:w-[222px]"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <Image
                            width={130}
                            height={130}
                            alt={menu.image_url}
                            className="w-[130px] h-[130px] lg:h-[190px] lg:w-[190px] object-cover"
                            src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${menu.image_url}`}
                          />
                          <div className="py-[10px]">
                            <div className="w-[200px] text-center text-namedrink ">
                              {menu.name}
                            </div>
                            <div className="text-center text-mini">
                              {menu.price}
                            </div>
                          </div>
                        </div>
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
          }fixed h-[calc(100vh-200px)] duration-1000  w-[90vw] max-w-[1110px] rounded-[20px_0px_20px_20px] text-center bg-[#e8e6e6]`}
          onClick={handleYourOrder}
        >
          <div className="rounded-t-lg text-center text-base bg-[#e8e6e6] absolute p-[10px_20px] top-[-55px] right-[0px] w-[200px] lg:text-namedrink">
            Your Order
          </div>
          <div>
            {allmenude.order_menu &&
              allmenude.order_menu.map((user: any, index: number) => (
                <div key={index}>
                  <div>{user.name}</div>
                  <div>
                    <Image
                      width={130}
                      height={130}
                      alt={user.name}
                      className="w-[130px] h-[130px] "
                      src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${user.image_url}`}
                    />
                  </div>
                  {user.temp && <div>{user.temp}</div>}
                  {user.shot && <div>{user.shot}</div>}
                  {user.sweet && <div>{user.sweet}</div>}
                </div>
              ))}
            <button
              onClick={submitorder}
              className="bg-green-300 p-[10px_25px]"
            >
              Sent
            </button>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Home;
