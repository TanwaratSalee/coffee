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
      name: z
        .string({
          required_error: "name is require",
        })
        .nonempty({
          message: "name Can't be empty!",
        }),
      price: z.number({
        required_error: "Require price",
      }),
      group_id: z
        .string({
          required_error: "id is require",
        })
        .nonempty({
          message: "name Can't be empty!",
        }),
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

    const { name, price, is_public, group_id } = response.data;

    const { data: insertData, error: insertError } = await supabase
      .from("menu")
      .insert({
        name: name,
        price: price,
        is_public: is_public,
        group_id: group_id,
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
