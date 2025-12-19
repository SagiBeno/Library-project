//GET get_or_create_book method

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

    const { external_key, title, author, cover_url } = await request.json();

    if (!external_key || !title || !author || !cover_url) {
        return new Response(
            JSON.stringify({ error: "external_key, title, author and cover_url are required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const { book_data, book_error } = await supabase
        .from('library_project_books')
        .select("id")
        .eq('external_key', external_key)
        .single();

    if (book_error) {
        return new Response(
            JSON.stringify({ error: book_error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }

    if (!book_data) {
        //create book

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
    return new Response(
        JSON.stringify({ message: "Book already exists", book_data }),
        { status: 200, headers: jsonHeaders }
    );
}