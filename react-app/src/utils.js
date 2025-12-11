const searchURL = "https://openlibrary.org/search.json";
const coverURL = "https://covers.openlibrary.org/b/olid/"; +"OLID-{olid}-{size}.jpg";

export async function fetchBooksByQuery(queryObj) {
    const params = new URLSearchParams();
    for (const key in queryObj) {
        params.append(key, queryObj[key]);
    }

    const response = await fetch(`${searchURL}?${params.toString()}`);
    return await response.json();
}

export function getCoverImageURL(olid, size = 'M') {
    return coverURL.replace('{olid}', olid).replace('{size}', size);
}