/**
 * Get all borrow records.
 *
 * Retrieves all borrow entries from the `library_project_borrows` table,
 * including related user and book information.
 *
 * Each borrow record contains:
 * - borrow date
 * - return date
 * - status
 * - username of the borrowing user
 * - title of the borrowed book
 *
 * @route GET /.netlify/functions/get_all_borrows
 *
 * @param {Request} request - Netlify Function request object
 *
 * @response 200 application/json Successfully retrieved borrow records
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */

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