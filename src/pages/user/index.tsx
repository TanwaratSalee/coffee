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
            className={`${
              typeorder == "All" ? "bg-[#C8E31C]" : "bg-[#F0EEEE]"
            } text-center text-black } text-center text-black p-[3px_25px] font-light hover:text-white rounded-3xl mr-[20px] lg:text-[25px] lg:p-[7px_30px] `}
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
                className={`${
                  typeorder == group.name ? "bg-[#C8E31C]" : "bg-[#F0EEEE]"
                } text-center text-black p-[4px_25px] font-light	rounded-3xl mr-[20px] last:mb-0 lg:text-[25px] lg:p-[7px_30px] `}
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
                        className={`${
                          typeorder == group.name
                            ? "bg-[#C8E31C]"
                            : "bg-[#F0EEEE]"
                        } p-[10px] h-[230px] w-[150px] rounded-lg mr-[15px] last:mb-0 lg:h-[290px] lg:w-[222px] `}
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
          }fixed h-[calc(100vh-200px)] duration-1000  w-[90vw] max-w-[1110px] rounded-[20px_0px_20px_20px] text-center bg-[#f3f2f2]`}
          onClick={handleYourOrder}
        >
          <div className="rounded-t-lg text-center text-base bg-[#f3f2f2] absolute p-[10px_20px] top-[-55px] right-[0px] w-[200px] lg:text-namedrink">
            Your Order
          </div>
          <div className="m-[50px_100px] overflow-y-auto h-[800px]">
            {allmenude.order_menu &&
              allmenude.order_menu.map((user: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-center pt-[30px] gap-[60px] border-b-[2px] border-[#dedbdb]"
                >
                  <div>
                    <Image
                      width={130}
                      height={130}
                      alt={user.name}
                      className="w-auto h-[200px] pb-[30px]"
                      src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${user.image_url}`}
                    />
                  </div>
                  <div className="flex flex-col gap-[20px] text-start">
                    <div>{user.name}</div>
                    {user.temp && <div>Tempature : {user.temp}</div>}
                    {user.shot && <div>Shot :{user.shot}</div>}
                    {user.sweet && <div>Sweet :{user.sweet}</div>}
                  </div>
                </div>
              ))}

            <div className="absolute w-[90vw] max-w-[910px] bottom-[80px] bg-[#f3f2f2]">
              <button
                onClick={submitorder}
                className="bg-[#def25e] p-[10px_25px] mr-[30px] h-[70px] w-2/6"
              >
                Sent
              </button>
              <button className="bg-white p-[10px_25px] h-[70px] w-2/6">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Home;
