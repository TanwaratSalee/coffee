import { useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  const groups = [
    {
      id: 1,
      name: "coffee",
      menus: [
        {
          id: 1,
          name: "americano",
          price: 120,
        },
        {
          id: 2,
          name: "ice coffee",
        },
      ],
    },
    {
      id: 2,
      name: "fff",
      menus: [],
    },
    {
      id: 3,
      name: "Soda",
      menus: [],
    },
  ];

  return (
    <div>
      <ul>
        {groups.map((group) => (
          <li>
            {group.name} :
            {group.menus.map((menu) => (
              <span>{menu.name},</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
