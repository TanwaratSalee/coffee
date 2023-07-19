import ButtonSubmit from "@/components/ButtonSubmit";
import SelectMenu from "@/components/SelectMenu";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Detailoreder() {
  const router = useRouter();
  const [temp, setTemp] = useState("");
  const [shot, setShot] = useState("");
  const [sweet, setSweet] = useState("");
  const datas = [
    {
      temperature: "Hot",
      addShot: "1 shot",
      sweet: "25%",
    },
    {
      temperature: "Cold",
      addShot: "2 shot",
      sweet: "50%",
    },
    {
      temperature: "Smooth",
      addShot: "3 shot",
      sweet: "75%",
    },
  ];
  const handleButtonSetTemp = (buttonName: any) => {
    setTemp(buttonName);
    console.log(buttonName);
  };
  const handleButtonSetShot = (buttonName: any) => {
    setShot(buttonName);
  };
  const handleButtonSetSweet = (buttonName: any) => {
    setSweet(buttonName);
  };
  return (
    <div className="mx-auto max-w-[1110px]">
      <h1 className="text-[60px]">Detail Order</h1>
      <div className="w-fit m-auto">
        <div className="text-center text-[60px]">{router.query.menu}</div>
        <div className="pb-[20px]">Temperature</div>
        <div className="flex mb-[10px]">
          {datas.map((data, i) => (
            <button
              className={`${
                temp == data.temperature ? "bg-white bg-opacity-50" : "bg-none"
              }`}
              key={i}
              onClick={(e) => {
                handleButtonSetTemp(data.temperature);
              }}
            >
              <SelectMenu temp={data.temperature} />
            </button>
          ))}
        </div>
        <div className="pb-[20px]">Add Shot</div>
        <div className="flex mb-[10px]">
          {datas.map((data, i) => (
            <button
              className={`${
                shot == data.addShot ? "bg-white bg-opacity-50" : "bg-none"
              }`}
              key={i}
              onClick={(e) => {
                handleButtonSetShot(data.addShot);
              }}
            >
              <SelectMenu key={i} temp={data.addShot} />
            </button>
          ))}
        </div>
        <div className="pb-[20px]">Sweetness</div>
        <div className="flex mb-[10px]">
          {datas.map((data, i) => (
            <button
              className={`${
                sweet == data.sweet ? "bg-white bg-opacity-50" : "bg-none"
              }`}
              key={i}
              onClick={(e) => {
                handleButtonSetSweet(data.sweet);
              }}
            >
              <SelectMenu key={i} temp={data.sweet} />
            </button>
          ))}
        </div>
        <div className="pb-[20px]">note</div>
        <input className="w-full max-w-[500px] p-[10px_15px]" type="text" />
        <ButtonSubmit detail={"ยืนยัน"} />
        {/* <div className="pb-[20px]">{router.query.price}</div> */}
      </div>
    </div>
  );
}
