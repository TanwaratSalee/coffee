import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/layout-admin";
// import { addons } from "../../../mock-data/data";
interface MenuItem {
  id: number;
  name: string;
}

interface DataItem {
  id: number;
  name: string;
  menu: MenuItem[];
}

interface Addon {
  id: number;
  name: string;
  add_on: MenuItem[];
}

const Home = () => {
  const [groups, setGroup] = useState<DataItem[] | undefined>([]);
  const [addons, setAddOn] = useState<Addon[] | undefined>([]);

  // await
  useEffect(() => {
    fetchDataMenu();
    fetchDataAddOn();
  }, []);

  const fetchDataMenu = async () => {
    try {
      const response = await fetch("../api/admin/list-group-menu");
      const jsonData = await response.json();
      setGroup(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataAddOn = async () => {
    try {
      const response2 = await fetch("../api/admin/list-group-addon");
      const jsonData1 = await response2.json();
      console.log(jsonData1);
      setAddOn(jsonData1.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <LayoutAdmin>
      <div className="">
        <div className="text-heading text-center font-medium ">
          Order And Menu
        </div>
        <div className="flex align-center justify-between m-[20px]">
          <div className="text-maintopic font-normal">Menu</div>
          <Link
            href="../admin/group-menu/addgroup"
            className="text-base border border-black rounded-lg p-[5px_15px]"
          >
            + Add Group
          </Link>
        </div>
        <ul className="border border-black rounded-lg p-[20px_15px] m-[20px]">
          {groups &&
            groups.map((group) => (
              <li
                key={group.name}
                className="border border-black rounded-lg p-[25px_10px] m-[10px] "
              >
                <div className="text-topic flex align-center justify-between m-[20px]">
                  <div>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    ></input>
                    {group.name}{" "}
                  </div>
                  <Link
                    href="../admin/group-menu/addmenu"
                    className="border border-black rounded-lg text-base p-[8px_15px]"
                  >
                    + Add Menu
                  </Link>
                </div>
                <div className="flex flex-wrap">
                  {group &&
                    group.menu.map((menu) => (
                      <span
                        key={menu.name}
                        className="border border-black rounded-lg p-[15px_12px] m-[0px_5px]"
                      >
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value="Bike"
                        ></input>
                        {menu.name}
                      </span>
                    ))}
                </div>
              </li>
            ))}
        </ul>
        <div className="flex align-center justify-between m-[20px]">
          <div className="text-maintopic font-normal">Add on</div>
          <Link
            href="/admin/group-addon/addgroup"
            className="text-base border border-black rounded-lg p-[5px_15px]"
          >
            + Add Group
          </Link>
        </div>
        <ul className="border border-black rounded-lg p-[30px_25px] m-[20px]">
          {addons &&
            addons.map((addon) => (
              <li
                key={addon.name}
                className="border border-black rounded-lg p-[30px_25px] m-[10px]"
              >
                <div className="flex align-center justify-between m-[20px]">
                  <div className="flex">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    ></input>
                    <div className="text-topic m-[15px_0px]">{addon.name}</div>
                  </div>
                  <Link
                    href="../admin/group-addon/addmenu"
                    className="border border-black rounded-lg p-[10px_15px] m-5"
                  >
                    + Add Menu
                  </Link>
                </div>
                {addon &&
                  addon.add_on.map((menu) => (
                    <span
                      key={menu.name}
                      className=" border border-black rounded-lg p-[10px_15px] m-2"
                    >
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      ></input>
                      {menu.name}
                    </span>
                  ))}
              </li>
            ))}
        </ul>
      </div>
    </LayoutAdmin>
  );
};

export default Home;
