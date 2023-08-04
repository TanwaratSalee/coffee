import type { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import supabase from "../../../../lib/supabase";

type Data = {
  success: boolean;
  message: string;
  data?: any[];
  errors?: ZodIssue[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const schema = z.object({
      menu_id: z.number(),
      group_add_on_id: z.number(),
    });

    const response = schema.safeParse(req.body);

    if (!response.success) {
      const { errors } = response.error;

      return res.status(400).json({
        success: false,
        message: "error",
        errors: errors,
      });
    }

    const { menu_id, group_add_on_id } = response.data;

    const { data: insertData, error: insertError } = await supabase
      .from("menu_add_on")
      .insert({
        menu_id: menu_id,
        group_add_on_id: group_add_on_id,
      })
      .select();

    if (!insertError) {
      return res.status(200).json({
        success: true,
        message: "ok",
        data: insertData,
      });
    }

    return res.status(500).json({
      success: false,
      message: "error" + insertError.message,
      errors: [],
    });
  }
  return res.status(405).json({
    success: false,
    message: "method not allowed",
    errors: [],
  });
}
