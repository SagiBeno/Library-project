//POST get all borrows for a user by username

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

    const { username } = await request.json();

    if (!username) {
        return new Response(
            JSON.stringify({ error: "username is required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const user_res = await supabase
        .from('library_project_users')
        .select('id')
        .eq('username', username)
        .single();

    if (user_res.error || !user_res.data) {
        return new Response(
            JSON.stringify({ error: "User not found" }),
            { status: 404, headers: jsonHeaders }
        );
    }

    const user_id = user_res.data.id;

    const borrows_res = await supabase
        .from('library_project_borrows')
        .select('*')
        .eq('user_id', user_id);

    if (borrows_res.error) {
        return new Response(
            JSON.stringify({ error: borrows_res.error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }


    const books_res = await supabase
        .from('library_project_books')
        .select('external_key')
        .in('id', borrows_res.data.map(b => b.book_id));

    if (books_res.error) {
        return new Response(
            JSON.stringify({ error: books_res.error.message }),
            { status: 500, headers: jsonHeaders }
        );
    }

    return new Response(
        JSON.stringify({ book_keys: books_res.data }),
        { status: 200, headers: jsonHeaders }
    );
}