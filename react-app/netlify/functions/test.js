/**
 * Test endpoint for retrieving user data.
 *
 * Retrieves user records from the `library_project_users` table.
 * This endpoint is intended for development and testing purposes only.
 *
 * Note: The request body parameters are currently not used
 * in the database query.
 *
 * @route POST /.netlify/functions/test
 *
 * @param {Request} request - Netlify Function request object
 * @bodyParam {string} username - Username (not used)
 * @bodyParam {string} password - Password (not used)
 * @bodyParam {string} email - Email address (not used)
 * @bodyParam {string} type - User type (not used)
 *
 * @response 200 application/json Successfully retrieved user data (test)
 * @response 500 application/json Database error
 */

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async (request, context) => {
    const jsonHeaders = { "content-type": "application/json" };

    const { username, password, email, type } = await request.json();

    const { data, error } = await supabase
        .from('library_project_users')
        .select("username, email, password, type");

    console.log(data, error);

    return new Response(
        JSON.stringify({ message: "test", users: data }),
        { status: 200, headers: jsonHeaders }
    );
}