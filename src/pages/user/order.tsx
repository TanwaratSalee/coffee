import LayoutUser from "../../../components/layout-user";
import { groups } from "../../../mock-data/data";

const Home = () => {
  return (
    <LayoutUser>
      <div className="">
        Drink Menu
        <ul>
          <div className="flex flex-cols ">
            {groups.map((group) => (
              <div className="p-[10px] m-[10px] bg-[#212325] text-white">
                {group.name}
              </div>
            ))}
          </div>
          {groups.map((group) => (
            <div className="border border-black rounded-lg p-[30px_25px] m-[35px]">
              <li key={group.name} className="">
                <div key={group.name} className="text-topic m-[10px]">
                  {group.name}
                </div>
                <div className="flex flex-wrap ">
                  {group.menus.map((menu) => (
                    <span className="m-[10px] border border-black rounded-lg p-[30px_25px]">
                      {menu.name}
                    </span>
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
