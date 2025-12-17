import { createClient } from "@supabase/supabase-js";
import bcrypt from 'bcrypt';

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

    const body = await request.json();

    const { username, password, email } = body || {};

    const type = body.type || 'member';

    console.log(username, password, email, type);

    if (!username || !password || !email) {
        return new Response(
            JSON.stringify({ error: "username, password and email required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    //check if user already exists

    ///username
    const { data: existingUserByUsername } = await supabase
        .from('library_project_users')
        .select('username')
        .eq('username', username)
        .single();

    if (existingUserByUsername) {
        return new Response(
            JSON.stringify({ error: "Username already exists" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    //email
    const { data: existingUserByEmail } = await supabase
        .from('library_project_users')
        .select('email')
        .eq('email', email)
        .single();

    if (existingUserByEmail) {
        console.log(existingUserByEmail);

        return new Response(
            JSON.stringify({ error: "Email already exists" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    //crypt password

    const hashedPassword = bcrypt.hashSync(password, 12);

    //insert new user

    const { data, error } = await supabase
        .from('library_project_users')
        .insert([
            { username, password: hashedPassword, email, type }
        ])
        .select()
        .single();

    if (error) {
        return new Response(
            JSON.stringify({ error: "Error creating user" }),
            { status: 500, headers: jsonHeaders }
        );
    }
    return new Response(
        JSON.stringify({ message: "User registered successfully", user: data }),
        { status: 201, headers: jsonHeaders }
    );
}