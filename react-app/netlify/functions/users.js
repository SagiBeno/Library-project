/**
 * Retrieve users by type.
 *
 * Fetches all users filtered by their role/type (e.g. admin or member).
 * Intended for administrative use.
 *
 * @route GET /.netlify/functions/get_users_by_type
 *
 * @queryParam {string} type - User type to filter by (e.g. "admin", "member")
 *
 * @response 200 application/json Array of users
 */


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