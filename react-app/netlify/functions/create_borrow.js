//POST create borrow method

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