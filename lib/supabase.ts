import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
console.log(supabaseAnonKey, "1");
console.log(supabaseUrl, "2");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
