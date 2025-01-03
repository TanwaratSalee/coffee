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
      price_add_on: z.number({
        required_error: "Require price",
      }),
      group_add_on_id: z
        .string({
          required_error: "name is require",
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

    const { name, price_add_on, is_public, group_add_on_id } = response.data;

    const { data: insertData, error: insertError } = await supabase
      .from("add_on")
      .insert({
        name: name,
        price_add_on: price_add_on,
        is_public: is_public,
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
