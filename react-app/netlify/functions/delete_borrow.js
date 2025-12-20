/**
 * Delete a borrow record.
 *
 * Removes a borrow entry from the `library_project_borrows` table.
 * Used to delete a borrowing record (e.g. when a book is returned or an entry is removed).
 *
 * @route DELETE /.netlify/functions/delete_borrow
 *
 * @param {Request} request - Netlify Function request
 * @bodyParam {number} id - ID of the borrow record to delete
 *
 * @response 200 application/json Borrow record deleted successfully
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */


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