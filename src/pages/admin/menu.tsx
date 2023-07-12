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
            href="/admin/group-menu/add.tsx"
            className="text-base border border-black rounded-lg p-[5px_15px]"
          >
            + Add Group
          </Link>
        </div>
        <ul className="border border-black rounded-lg p-[20px_15px] m-[20px]">
          {groups.map((group) => (
            <li className="border border-black rounded-lg p-[25px_10px] m-[10px]">
              <div className="text-topic m-[10px]">{group.name} </div>
              <Link
                href="/src/pages/admin/group-menu/add.tsx"
                className="border border-black rounded-lg p-[10px_15px] m-5"
              >
                + Add Menu
              </Link>
              {group.menus.map((menu) => (
                <span className="border border-black rounded-lg p-[15px_12px] m-5">
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

        <div className="flex align-center justify-between m-[20px]">
          <div className="text-maintopic font-normal">Add on</div>
          <Link
            href="/src/pages/admin/group-menu/add.tsx"
            className="text-base border border-black rounded-lg p-[5px_15px]"
          >
            + Add Group
          </Link>
        </div>
        <ul className="border border-black rounded-lg p-[30px_25px] m-[20px]">
          {addons.map((addon) => (
            <li className="border border-black rounded-lg p-[30px_25px] m-[10px]">
              <div className="flex">
                <input type="checkbox" id="public" name="public"></input>
                <div className="text-topic m-[15px_0px]">{addon.name}</div>
              </div>
              <Link
                href="/src/pages/admin/group-menu/add.tsx"
                className="border border-black rounded-lg p-[10px_15px] m-5"
              >
                + Add Menu
              </Link>
              {addon.menus.map((menu) => (
                <span className=" border border-black rounded-lg p-[10px_15px] m-2">
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
