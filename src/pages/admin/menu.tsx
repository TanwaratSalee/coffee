import Link from "next/link";
import LayoutAdmin from "../../../components/layout-admin";
import { addons, groups } from "../../../mock-data/data";

const Home = () => {
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
          {groups.map((group) => (
            <li
              key={group.name}
              className="border border-black rounded-lg p-[25px_10px] m-[10px] "
            >
              <div
                key={group.name}
                className="text-topic flex align-center justify-between m-[20px]"
              >
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
                {group.menus.map((menu) => (
                  <span className="border border-black rounded-lg p-[15px_12px] m-[0px_5px]">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                      key={menu.name}
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
          {addons.map((addon) => (
            <li className="border border-black rounded-lg p-[30px_25px] m-[10px]">
              <div className="flex">
                <div key={addon.name} className="text-topic m-[15px_0px]">
                  {addon.name}
                </div>
                <Link
                  href="../admin/group-addon/addmenu"
                  className="border border-black rounded-lg p-[10px_15px] m-5"
                >
                  + Add Menu
                </Link>
              </div>
              {addon.menus.map((menu) => (
                <span
                  key={menu.name}
                  className=" border border-black rounded-lg p-[10px_15px] m-2"
                >
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
