/**
 * Retrieve a book by external key or create it if it does not exist.
 *
 * This endpoint checks whether a book with the given Open Library external key
 * already exists in the database. If not, it creates a new book record.
 *
 * @route GET /.netlify/functions/get_or_create_book
 *
 * @param {Request} request - Netlify Function request
 * @bodyParam {string} external_key - Open Library external key (e.g. /works/OL123W)
 * @bodyParam {string} title - Book title
 * @bodyParam {string} author - Book author
 * @bodyParam {string} cover_url - Cover image URL
 *
 * @response 200 application/json Book already exists
 * @response 201 application/json Book created successfully
 * @response 400 application/json Missing required fields
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */

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