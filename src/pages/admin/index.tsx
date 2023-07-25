import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
import supabase from "../../../lib/supabase";
// import { addons } from "../../../mock-data/data";

interface MenuItem {
  id: number;
  name: string;
  is_public: boolean;
}

interface DataItem {
  id: number;
  name: string;
  menu: MenuItem[];
}

interface Addon {
  id: number;
  name: string;
  is_public: boolean;
  add_on: MenuItem[];
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

  const { data: addon } = await supabase.from("group_add_on").select(`
  id,
  name,
  is_public,
    add_on (
      id,
      name,
      is_public
    )   
  )
`);
  return { props: { group, addon } };
};

const Home = ({ group, addon }: any) => {
  const [groups, setGroup] = useState<DataItem[] | undefined>([]);
  const [addons, setAddOn] = useState<Addon[] | undefined>([]);

  const handleCheckboxChangemenu = async (value: boolean, id: number) => {
    const { data: insertData, error: insertError } = await supabase
      .from("menu")
      .update({
        is_public: value,
      })
      .eq("id", id);
  };
  const handleCheckboxChangeaddon = async (value: boolean, id: number) => {
    console.log(value);
    const { data: insertData, error: insertError } = await supabase
      .from("add_on")
      .update({
        is_public: value,
      })
      .eq("id", id);
  };

  const setvaluesql = async (id: number) => {};
  // await
  useEffect(() => {
    // fetchDataMenu();
    console.log(addon);
    setGroup(group);
    setAddOn(addon);
    // fetchDataAddOn();
  }, []);

  // const fetchDataMenu = async () => {
  //   try {
  //     const response = await fetch("../api/admin/list-group-menu");
  //     const jsonData = await response.json();
  //     setGroup(jsonData.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // const fetchDataAddOn = async () => {
  //   try {
  //     const response2 = await fetch("../api/admin/list-group-addon");
  //     const jsonData1 = await response2.json();
  //     setAddOn(jsonData1.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <LayoutAdmin>
      <div>
        <div className="text-heading text-center p-[30px-10px]">
          Order And Menu
        </div>
        <div className="flex justify-between m-[40px_50px_20px_50px]">
          <div className="text-topic ">Menu</div>
          <Link
            href="../admin/group-menu/addgroup"
            className="border border-black rounded-xl text-base p-[10px_30px]"
          >
            + Add Group
          </Link>
        </div>
        <ul className="border border-black rounded-2xl m-[20px_30px_50px_30px] p-[20px_30px]">
          {groups &&
            groups.map((group) => (
              <li className="text-base" key={group.name}>
                <div className="text-maintopic flex justify-between	">
                  <div>
                    <input
                      type="checkbox"
                      id="publicCheckbox"
                      name="vehicle1"
                      value="Bike"
                    ></input>
                    {group.name}
                  </div>
                  <Link
                    href={`../admin/group-menu/addmenu?groupId=` + group.id}
                    className="border border-black rounded-xl text-base	p-[8px_25px]"
                  >
                    + Add Menu
                  </Link>
                </div>
                <div className="flex flex-wrap">
                  {group &&
                    group.menu.map((menu) => (
                      <div className="border border-black rounded-lg text-base p-[5px_20px] m-[20px_10px]">
                        <input
                          type="checkbox"
                          id="publicCheckbox"
                          name="vehicle1"
                          value="Bike"
                          onChange={(e) => {
                            handleCheckboxChangemenu(e.target.checked, menu.id);
                          }}
                        ></input>
                        <Link
                          href={
                            `../admin/group-menu/update-menu?nameId=` + menu.id
                          }
                          key={menu.name}
                        >
                          {menu.name}
                        </Link>
                      </div>
                    ))}
                </div>
              </li>
            ))}
        </ul>
        {/* --------------------- Add on --------------------- */}
        <div className="flex justify-between m-[15px_50px]">
          <div className="text-topic">Add on</div>
          <Link
            href="/admin/group-addon/addgroup"
            className="border border-black rounded-xl p-[10px_30px] text-base"
          >
            + Add Group
          </Link>
        </div>
        <ul className="border border-black rounded-2xl m-[20px_30px_50px_30px] p-[20px_30px]">
          {addons &&
            addons.map((addon) => (
              <li className="text-base" key={addon.name}>
                <div className="text-maintopic flex justify-between">
                  <div>
                    <input
                      type="checkbox"
                      id="publicCheckbox"
                      name="vehicle1"
                      value="Bike"
                    ></input>
                    {addon.name}
                  </div>
                  <Link
                    href={`../admin/group-addon/addmenu?addonId=` + addon.id}
                    className="border border-black rounded-xl text-base	p-[8px_25px]"
                  >
                    + Add On
                  </Link>
                </div>
                <div className="flex flex-wrap">
                  {addon &&
                    addon.add_on.map((menu) => (
                      <div
                        key={menu.name}
                        className="border border-black rounded-lg text-base p-[5px_20px] m-[20px_10px]"
                      >
                        <input
                          type="checkbox"
                          id="publicCheckbox"
                          name="addon"
                          defaultChecked={menu.is_public}
                          onChange={(e) => {
                            console.log(menu.is_public);
                            handleCheckboxChangeaddon(
                              e.target.checked,
                              menu.id
                            );
                          }}
                        ></input>
                        <Link
                          href={
                            `../admin/group-addon/update-addon?addonId=` +
                            menu.id
                          }
                        >
                          {menu.name}
                        </Link>
                      </div>
                    ))}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </LayoutAdmin>
  );
};

export default Home;
