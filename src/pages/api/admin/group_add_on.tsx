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
    const schema = z.object({
      name: z
        .string({
          required_error: "name is require",
          invalid_type_error: "name only string",
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

    const { name, is_public } = response.data;

    const { data: insertData, error: insertError } = await supabase
      .from("group_add_on")
      .insert({
        name: name,
        // is_public: is_public,
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
      message: "error: " + insertError.message,
    });
  }
  return res.status(405).json({
    success: false,
    message: "method not allowed",
  });
}
