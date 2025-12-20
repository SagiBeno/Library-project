/**
 * Get a book by external key.
 *
 * Retrieves a single book record from the `library_project_books` table
 * using its `external_key` value.
 *
 * @route POST /.netlify/functions/get_book_by_external_id
 *
 * @param {Request} request - Netlify Function request object
 * @bodyParam {string} external_key - External identifier of the book
 *
 * @response 200 application/json Successfully retrieved book data
 * @response 400 application/json External key is required
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */

//POST get book by external key

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

    const { external_key } = await request.json();

    if (!external_key) {
        return new Response(
            JSON.stringify({ error: "external_key is required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const book_res = await supabase
        .from('library_project_books')
        .select('*')
        .eq('external_key', external_key)
        .single();
    if (book_res.error) {
        return new Response(
            JSON.stringify({ error: book_res.error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }
    return new Response(
        JSON.stringify({ data: book_res.data }),
        { status: 200, headers: jsonHeaders }
    );
}