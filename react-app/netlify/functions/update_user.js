/**
 * Update user information.
 *
 * Updates username and email, and optionally updates the password.
 * If a new password is provided, it is hashed before being stored.
 *
 * @route PUT /.netlify/functions/update_user
 *
 * @param {Request} request - Netlify Function request
 * @bodyParam {number} id - ID of the user to update
 * @bodyParam {string} username - Updated username
 * @bodyParam {string} email - Updated email address
 * @bodyParam {string} [password] - Optional new password (hashed before storage)
 *
 * @response 200 application/json User updated successfully
 * @response 405 application/json Method not allowed
 * @response 500 application/json Database error
 */


//PUT update_user method
import { createClient } from "@supabase/supabase-js";
import bcrypt from 'bcrypt';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    if (request.method !== "PUT") {
        return new Response({
            statusCode: 405,
            headers: jsonHeaders,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        });
    }

    const { id, username, password, email } = await request.json();

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const { data, error } = await supabase
            .from('library_project_users')
            .update({ username: username, email: email, password: hashedPassword })
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
    else {
        const { data, error } = await supabase
            .from('library_project_users')
            .update({ username: username, email: email })
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




}