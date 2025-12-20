/**
 * Utility functions for data fetching and API communication.
 *
 * This module handles:
 * - Fetching book data from the Open Library API (search and subjects)
 * - Generating cover image URLs
 * - Communicating with backend Netlify Functions (auth, users, books)
 *
 * The module acts as a service layer between the React frontend
 * and external/internal APIs.
 */

import supabase from '././supabase-test/supabase';

const searchURL = "https://openlibrary.org/search.json?q=";
const subjectsURL = "https://openlibrary.org/subjects/";

/**
 * Fetches books from Open Library by subject (genre).
 *
 * @param {string} subject - Open Library subject key (e.g. "fantasy", "science_fiction")
 * @returns {Promise<Object>} Open Library subject response JSON
 */

export async function fetchBooksBySubject(subject) {
    const response = await fetch(`${subjectsURL}${subject}.json`);
    return await response.json();
}

/**
 * Fetches books from Open Library using a search query.
 *
 * @param {string} searchQuery - Search term (title, author, keyword)
 * @returns {Promise<Object>} Open Library search response JSON
 */

export async function fetchBooksByQuery(searchQuery) {
    const response = await fetch(`${searchURL}${searchQuery}`);
    return await response.json();
}

/**
 * Retrieves user data for admin purposes filtered by user type.
 *
 * @param {string} type - User type (e.g. "admin", "member")
 * @returns {Promise<string>} JSON string containing user records
 */

export async function dataRetrievalForAdmin(type) {
    const response = await supabase
        .from('library_project_users')
        .select("*")
        .eq('type', type);

    return JSON.stringify(response);
}

/**
 * Authenticates a user via backend login function.
 *
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Response>} Fetch response object
 */

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

/**
 * Registers a new user.
 *
 * @param {string} username - Desired username
 * @param {string} password - User password
 * @param {string} email - User email
 * @param {string} [type='member'] - User type
 * @returns {Promise<Response>} Fetch response object
 */

export async function registerUser(username, password, email, type = 'member') {
    const res = await fetch(`/.netlify/functions/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, type }),
    })

    return res;
}

async function testFunction() {
    const res = await fetch(`/.netlify/functions/test`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })

    return res;
}

/**
 * Registers a new user.
 *
 * @param {string} username - Desired username
 * @param {string} password - User password
 * @param {string} email - User email
 * @param {string} [type='member'] - User type
 * @returns {Promise<Response>} Fetch response object
 */

export async function updateUser(id, username, password, email) {
    const res = await fetch(`/.netlify/functions/update_user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, username, password, email }),
    })
    return res;
}

/**
 * Deletes a user by ID.
 *
 * @param {number} id - User ID
 * @returns {Promise<Response>} Fetch response object
 */

export async function deleteUser(id) {
    const res = await fetch(`/.netlify/functions/delete_user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    return res;
}

/**
 * Retrieves a book by external key or creates it if it does not exist.
 *
 * @param {string} external_key - Open Library external key
 * @param {string} title - Book title
 * @param {string} author - Book author
 * @param {string} cover_url - Cover image URL
 * @returns {Promise<Response>} Fetch response object
 */

export async function handleBook(external_key, title, author, cover_url) {
    const res = await fetch(`/.netlify/functions/get_or_create_book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ external_key, title, author, cover_url }),
    })
    return res;
}

export async function getBookBorrowInfo(book_id) {
    const res = await fetch(`/.netlify/functions/get_borrow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id }),
    })
    return res;
}

export async function createBookBorrow(username, book_id_external, borrow_length) {
    const res = await fetch(`/.netlify/functions/create_borrow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, book_id_external, borrow_length }),
    })
    return res;
}

export async function getAllBorrowsForUser(username) {
    const res = await fetch(`/.netlify/functions/get_all_borrow_for_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    return res;
}

export async function getBookById(external_key) {
    const res = await fetch(`/.netlify/functions/get_book_by_id`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ external_key }),
    })
    return res;
}

export async function getAllBorrows() {
    const res = await fetch(`/.netlify/functions/get_all_borrows`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return res;
}

export async function deleteBorrow(borrow_id) {
    const res = await fetch(`/.netlify/functions/delete_borrow`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: borrow_id }),
    })
    return res;
}