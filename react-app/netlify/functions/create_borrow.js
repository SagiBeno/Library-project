/**
 * Create a borrow record (borrow a book).
 *
 * Validates input, resolves internal user/book IDs from username and Open Library external key,
 * calculates return date based on borrow_length (days), then inserts a new row into `library_project_borrows`.
 *
 * Notes:
 * - This endpoint currently does NOT prevent borrowing a book that is already borrowed.
 *   Recommended: check for an active borrow (status='borrowed' AND return_date is null/ > now) before insert.
 *
 * @route POST /.netlify/functions/createBorrow
 * @param {Request} request - Netlify Functions request
 * @returns {Response}
 *
 * @bodyParam {string} username - Username of the borrower (must exist in `library_project_users`)
 * @bodyParam {string} book_id_external - External book key (must exist in `library_project_books.external_key`)
 * @bodyParam {number} borrow_length - Borrow duration in days (positive integer)
 *
 * @response 201 application/json Borrow created successfully
 * @response 400 application/json Missing required fields
 * @response 404 application/json User not found / Book not found
 * @response 405 application/json Method not allowed (non-POST)
 * @response 500 application/json Database error
 */

//POST create borrow method

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

//destructure is buggy 

export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            { status: 405, headers: jsonHeaders }
        );
    }
    const { username, book_id_external, borrow_length } = await request.json();

    if (!username || !book_id_external || !borrow_length) {
        return new Response(
            JSON.stringify({ error: "username, book_id_external and borrow_length are required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const { user_data, user_error } = await supabase
        .from('library_project_users')
        .select('id')
        .eq('username', username)
        .single();

    if (user_error || !user_data) {
        return new Response(
            JSON.stringify({ error: "User not found" }),
            { status: 404, headers: jsonHeaders }
        );
    }

    const user_id = user_data.id;

    const { book_data, book_error } = await supabase
        .from('library_project_books')
        .select('id')
        .eq('external_key', book_id_external)
        .single();

    if (book_error || !book_data) {
        return new Response(
            JSON.stringify({ error: "Book not found" }),
            { status: 404, headers: jsonHeaders }
        );
    }

    const book_id = book_data.id;

    const borrow_start = new Date();
    const return_date = new Date();
    return_date.setDate(return_date.getDate() + borrow_length); // add borrow_length days

    const { data, error } = await supabase
        .from('library_project_borrows')
        .insert([
            { borrow_start: borrow_start, return_date: return_date, user_id: user_id, book_id: book_id, status: 'borrowed' }
        ]);

    if (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }
    return new Response(
        JSON.stringify({ message: "Borrow created successfully", data }),
        { status: 201, headers: jsonHeaders }
    );


}