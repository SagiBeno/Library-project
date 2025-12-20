/**
 * Get borrow records by book ID.
 *
 * Retrieves all borrow entries from the `library_project_borrows` table
 * that are associated with the specified `book_id`.
 *
 * @route POST /.netlify/functions/get_borrow
 *
 * @param {Request} request - Netlify Function request object
 * @bodyParam {number} book_id - ID of the book whose borrow records are requested
 *
 * @response 200 application/json Successfully retrieved borrow records
 * @response 400 application/json Book ID is required
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */

//POST get_borrow method

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

    const { book_id } = await request.json();

    if (!book_id) {
        return new Response(
            JSON.stringify({ error: "book_id is required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const { data, error } = await supabase
        .from('library_project_borrows')
        .select('*')
        .eq('book_id', book_id);

    console.log("data", data)

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