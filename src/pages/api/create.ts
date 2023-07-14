import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";

type Data = {
  success: boolean;
  message: string;
  data: any[];
};

type MenuData = {
  name: string;
  price: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const { name, price }: MenuData = req.body;
    console.log(req.body);

    const { data: insertData, error: insertError } = await supabase
      .from("menu")
      .insert({ name: name, price: price })
      .select();

    if (!insertError) {
      return res.status(200).json({
        success: true,
        message: "ok",
        data: insertData,
      });
    }

    return res.status(200).json({
      success: false,
      message: "no",
      data: [],
    });

    const { data, error } = await supabase.from("menu").select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการรับข้อมูล",
        data: [],
      });
    }

    console.log(data);

    return res.status(200).json({
      success: true,
      message: "",
      data: data,
    });
  }

  return res.status(405).json({
    success: false,
    message: "method not allowed",
    data: [],
  });
}
