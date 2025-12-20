//GET get all borrows

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    if (request.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            { status: 405, headers: jsonHeaders }
        );
    }

    const { data, error } = await supabase
        .from('library_project_borrows')
        .select(`
    id,
    borrow_date,
    return_date,
    status,
    library_project_users (
      username
    ),
    library_project_books (
      title
    )
  `);

    if (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }

    return new Response(
        JSON.stringify({ data: data }),
        { status: 200, headers: jsonHeaders }
    );
}