/**
 * Register a new user.
 *
 * Creates a new user account with a hashed password.
 * Ensures that both username and email are unique.
 *
 * @route POST /.netlify/functions/register
 *
 * @param {Request} request - Netlify Function request
 * @bodyParam {string} username - Unique username
 * @bodyParam {string} password - Plain text password (hashed before storage)
 * @bodyParam {string} email - Unique email address
 * @bodyParam {string} [type=member] - User role (default: member)
 *
 * @response 201 application/json User registered successfully
 * @response 400 application/json Missing fields or duplicate username/email
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */

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
        JSON.stringify({ message: "User registered successfully", user: {username: data.username, type: data.type} }),
        { status: 201, headers: jsonHeaders }
    );
}