import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodIssue } from "zod";
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
      name: z.string(),
      price: z.string(),
      is_public: z.boolean(),
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

    const { name, price, is_public } = response.data;

    const { data: insertData, error: insertError } = await supabase

      .from("group_menu")
      .insert({
        name: name,
        price: price,
        is_public: is_public,
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
      data: [],
    });
  }
  return res.status(405).json({
    success: false,
    message: "method not allowed",
    data: [],
  });
}
