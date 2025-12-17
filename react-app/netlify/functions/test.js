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