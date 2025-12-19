//POST book method

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            { status: 405, headers: jsonHeaders }
        );
    }

    const { external_key, title, author, cover_url } = await request.json(); // TODO created_at mező auotmatán a mai nap e?

    if (!external_key || !title || !author || !cover_url) {
        return new Response(
            JSON.stringify({ error: "external_key, title, author and cover_url are required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const { data, error } = await supabase
        .from('library_project_books')
        .insert([
            { external_key, title, author, cover_url }
        ]);

    if (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }
    return new Response(
        JSON.stringify({ message: "Book added successfully", data }),
        { status: 201, headers: jsonHeaders }
    );

}