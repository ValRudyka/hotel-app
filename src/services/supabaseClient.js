import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kngcgbzhvsehdtvcmzec.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;