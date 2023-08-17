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

interface YourOrder {
  image_url: string;
  qty: number;
  name: string;
  note: string;
  price: number;
  short: string;
  sweeth: string;
  temp: string;
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

  const handleAddMore = (amount: number, i: number) => {
    const yourOrders = allmenude.order_menu as YourOrder[];
    const findmenu = yourOrders.find((it: YourOrder, index) => index === i);

    if (findmenu) {
      // findmenu.qty = 1
      const newItem = {
        ...findmenu,
        qty: findmenu.qty + amount,
      };

      // const newItem = {
      //   image_url: findmenu.image_url,
      //   qty:  findmenu.qty + amount,
      //   name: findmenu.name,
      //   note: findmenu.note,
      //   price: findmenu.price,
      //   short: findmenu.short,
      //   sweeth: findmenu.sweeth,
      //   temp: findmenu.temp,
      // };

      const newAllMenu = yourOrders.map((oldItem, index) => {
        if (index == i) {
          return newItem;
        } else {
          return oldItem;
        }
      });
      setAllmenude({ order_menu: newAllMenu });
    }
  };

  const handleDeleteMenu = (index: number) => {
    const yourOrders = allmenude.order_menu as YourOrder[];
    const fillter: YourOrder[] = yourOrders.filter(
      (it: YourOrder, index) => index != index
    );
    setAllmenude({ order_menu: fillter });
  };

  const submitorder = async (e: any) => {
    e.preventDefault();
    // เพิ่ม order
    const body = JSON.stringify(allmenude.order_menu);
    const response2 = await fetch("../../api/admin/order_menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response2.ok) {
      const data = await response2.json();
    } else {
      const data = await response2.json();
    }

    // allmenude.order_menu.forEach(async (value: any) => {
    //   const response2 = await fetch("../../api/admin/order_menu", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: value.name ? value.name : "",
    //       temp: value.temp ? value.temp : "",
    //       shot: value.shot ? value.shot : "",
    //       sweet: value.sweet ? value.sweet : "",
    //       price: value.price ? value.price : "",
    //     }),
    //   });

    //   if (!response2.ok) {
    //     const data = await response2.json();
    //   } else {
    //     const data = await response2.json();
    //   }
    // });

    setAllmenude({ order_menu: [] });
  };
  useEffect(() => {
    console.log(allmenude);
  }, [allmenude]);
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
            } cursor-pointer	text-center text-black } text-center text-black p-[3px_25px] font-light hover:text-white rounded-3xl mr-[20px] lg:text-[25px] lg:p-[7px_30px] `}
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
                            ? "bg-[#F0EEEE]"
                            : "bg-[#F0EEEE]"
                        } p-[10px] h-[230px] w-[150px] rounded-lg mr-[15px] last:mb-0 lg:h-[290px] lg:w-[222px] active:bg-[#C8E31C] bg-[#F0EEEE]`}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <Image
                            width={130}
                            height={130}
                            alt={menu.image_url}
                            className="w-ay h-[130px] lg:h-[190px] lg:w-[190px] object-cover"
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
              ? "top-[400px] left-1/2 -translate-x-1/2  "
              : " top-[calc(100%-0px)] left-1/2 -translate-x-1/2 -translate-y-0 "
          }fixed h-[calc(100vh-400px)] duration-1000  w-[90vw] max-w-[1110px] rounded-[20px_0px_20px_20px] text-center bg-[#f2efef] `}
        >
          <div className="relative">
            <div
              onClick={handleYourOrder}
              className="cursor-pointer rounded-t-lg text-center bg-[#f3f2f2] absolute p-[10px_20px] top-[-60px] right-[0px] w-[200px] text-namedrink"
            >
              Your Order
            </div>
            <div className="overflow-y-auto  h-[calc(100vh-650px)]">
              {allmenude.order_menu &&
                allmenude.order_menu.map((user: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 mt-[80px] border-b-[2px] border-[#dedbdb] "
                  >
                    <div className="col-start-2	col-end-5 m-auto">
                      <Image
                        width={130}
                        height={130}
                        alt={user.name}
                        className="w-auto h-[300px] pb-[30px]"
                        src={`https://dqpvcbseawfdldinabbp.supabase.co/storage/v1/object/public/images/${user.image_url}`}
                      />
                    </div>
                    <div className="col-start-5	col-end-7 text-start text-namedrink">
                      <div className="flex justify-between">
                        <div className="text-[40px] pb-[20px]">{user.name}</div>
                        <button
                          onClick={(e) => {
                            handleDeleteMenu(index);
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                      {user.temp && (
                        <div className="pb-[10px]">Tempature : {user.temp}</div>
                      )}
                      {user.shot && (
                        <div className="pb-[10px]">Shot :{user.shot}</div>
                      )}
                      {user.sweet && (
                        <div className="pb-[10px]">Sweet :{user.sweet}</div>
                      )}
                      {user.note && (
                        <div className="pb-[10px]">Note :{user.note}</div>
                      )}
                      {user.qty && (
                        <div className="bottom-0 ">
                          Quantity :
                          <div className="flex items-center justify-center p-[30px]">
                            <button
                              className="bg-[#C8E31C] w-[40px] h-[40px] text-namedrink rounded-full"
                              onClick={() => handleAddMore(-1, index)}
                            >
                              -
                            </button>
                            <span className="text-namedrink px-[15px] bg-[#fff] mx-[15px] w-[70px] text-center">
                              {user.qty}
                            </span>
                            <button
                              className="bg-[#C8E31C] w-[40px] h-[40px] text-namedrink rounded-full"
                              onClick={() => handleAddMore(1, index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              <div className="absolute w-full  bottom-[-260px] pt-[30px] pb-[100px] bg-[#f3f2f2] text-namedrink">
                <button
                  onClick={submitorder}
                  className="bg-[#def25e] p-[10px_25px] mr-[30px] h-[70px] w-2/6 "
                >
                  Sent
                </button>
                <button
                  onClick={handleYourOrder}
                  className="bg-white p-[10px_25px] h-[70px] w-2/6"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Home;
