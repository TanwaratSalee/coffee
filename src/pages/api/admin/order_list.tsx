import supabase from "../../../../lib/supabase";

export default async function order(req: any, res: any) {
  if (req.method === "GET") {
    try {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from("menu")
        .select()
        .eq("is_public", 1);
      if (error) {
        throw error;
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
