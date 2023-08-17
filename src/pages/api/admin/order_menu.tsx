import type { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import supabase from "../../../../lib/supabase";

type ResponseData = {
  success: boolean;
  message: string;
  data?: any[];
  errors?: ZodIssue[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method == "POST") {
    const schema = z.array(
      z.object({
        name: z.string({
          required_error: "name is require",
          invalid_type_error: "name only string",
        }),
        qty: z.number(),
        note: z.string({
          invalid_type_error: "name only string",
        }),
        temp: z.string({
          invalid_type_error: "name only string",
        }),
        shot: z.string({
          invalid_type_error: "name only string",
        }),
        sweet: z.string({
          invalid_type_error: "name only string",
        }),
        price: z.number({
          invalid_type_error: "name only number",
        }),
      })
    );

    const response = schema.safeParse(req.body);

    if (!response.success) {
      const { errors } = response.error;

      return res.status(400).json({
        success: false,
        message: "error",
        errors: errors,
      });
    }

    const insertVal = response.data.map((it) => ({
      menu: it.name,
      note: it.note,
      qty: it.qty,
      temp: it.temp,
      shot: it.shot,
      sweet: it.sweet,
      price: it.price,
    }));

    const { data: insertData, error: insertError } = await supabase
      .from("posts")
      .insert(insertVal)
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
      message: "error: " + insertError.message,
    });
  }
  return res.status(405).json({
    success: false,
    message: "method not allowed",
  });
}
