import { createClient } from "@supabase/supabase-js";
import bcrypt from 'bcrypt';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response(
            JSON.stringify({ error: "Invalid JSON body" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    const { email, password } = body || {};
    if (!email || !password) {
        return new Response(
            JSON.stringify({ error: "email and password required" }),
            { status: 400, headers: jsonHeaders }
        );
    }

    /*
    const { data, error, status } = await supabase
        .from("library_project_users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();
        */

    const { data, error } = await supabase
        .from('library_project_users')
        .select("username, password, type")
        .eq('email', email)
        .single();

    console.log(data, error);

    if (error || !data) {
        return new Response(
            JSON.stringify({ error: "Invalid credentials" }),
            { status: error?.status || 401, headers: jsonHeaders }
        );
    }

    if (!bcrypt.compareSync(password, data.password)) {
        return new Response(
            JSON.stringify({ error: "Invalid credentials" }),
            { status: 401, headers: jsonHeaders }
        );
    }

    return new Response(
        JSON.stringify({ message: "Authentication successful", user: data }),
        { status: 200, headers: jsonHeaders }
    );
};
