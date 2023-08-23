import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodIssue } from "zod";
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
        full_name: z.string({
          invalid_type_error: "name only string",
        }),
<<<<<<< HEAD
<<<<<<< HEAD
        no_order: z.string({
=======
        uid: z.string({
>>>>>>> 24830b9f5f0da434ea6334768064ba4ee3693dde
=======
        no_order: z.string({
>>>>>>> 34cca98ed653ddbfc2c56ddfd3b2bfc79398411a
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
        uid: z.string(),
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
      full_name: it.full_name,
<<<<<<< HEAD
<<<<<<< HEAD
      no_order: it.no_order,
=======
      uid: it.uid,
>>>>>>> 24830b9f5f0da434ea6334768064ba4ee3693dde
=======
      no_order: it.no_order,
>>>>>>> 34cca98ed653ddbfc2c56ddfd3b2bfc79398411a
      menu: it.name,
      note: it.note,
      qty: it.qty,
      temp: it.temp,
      shot: it.shot,
      sweet: it.sweet,
      price: it.price,
      uid: it.uid,
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
