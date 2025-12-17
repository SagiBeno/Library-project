import supabase from '././supabase-test/supabase';

const searchURL = "https://openlibrary.org/search.json?q=";
const coverURL = "https://covers.openlibrary.org/b/olid/"; +"OLID-{olid}-{size}.jpg";

export async function fetchBooksByQuery(searchQuery) {
    const response = await fetch(`${searchURL}${searchQuery}`);
    return await response.json();
}

export function getCoverImageURL(olid, size = 'M') {
    return coverURL.replace('{olid}', olid).replace('{size}', size);
}

export async function dataRetrievalForAdmin(type) {
    const response = await supabase
        .from('library_project_users')
        .select("*")
        .eq('type', type);

    return JSON.stringify(response);
}

export async function authenticateUser(email, password) {
    const res = await fetch(`/.netlify/functions/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    return res;
}