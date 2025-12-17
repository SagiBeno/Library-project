import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req) => {

    const type = req.query.type;
    const response = await supabase
        .from('library_project_users')
        .select("*")
        .eq('type', type);

    return response.status(200).json(response.data);
}