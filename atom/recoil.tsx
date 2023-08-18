import { atom } from "recoil";

export const recoilorder = atom({
  key: "recoilorder",
  default: {
    order_menu: [
      {
        image_url: "",
        qty: 0,
        name: "",
        note: "",
        price: 0,
        short: "",
        sweeth: "",
        temp: "",
      },
    ],
  },
});
