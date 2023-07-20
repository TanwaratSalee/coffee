import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../../lib/supabase";

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
    const { data, error } = await supabase.from("group_add_on").select(`
        id,
        name,
          add_on (
            id,
            name
          )   
        .eq("id", id);
        )
      `);

    // const { data, error } = await supabase.from("select_group_menu").select();

    // console.log("data", data);

    // const menu = data.map((it) => {
    //   return {
    //     id: it.id,
    //     name: it.name,
    //     detail: it['menu-add-on']['add-on']
    //   };
    // });

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
