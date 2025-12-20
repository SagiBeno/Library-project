//DELETE delete_borrow method

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    if (request.method !== "DELETE") {
        return new Response({
            statusCode: 405,
            headers: jsonHeaders,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        });
    }

    const { id } = await request.json();

    const { data, error } = await supabase
        .from('library_project_borrows')
        .delete()
        .eq('id', id);

    console.log(id);
    console.log(data);

    if (error) {
        return new Response({
            statusCode: 500,
            headers: jsonHeaders,
            body: JSON.stringify({ error: error.message }),
        });
    }
    return new Response({
        statusCode: 200,
        headers: jsonHeaders,
        body: JSON.stringify({ data }),
    });
}