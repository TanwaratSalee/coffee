import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";

type Data = {
  success: boolean;
  message: string;
  data: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("order_list").select();

    if (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "เกิดข้อผิดพลาดในการรับข้อมูล",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "ok",
      data: data,
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method Not Allowed",
    data: [],
  });
}