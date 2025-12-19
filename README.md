# Library Project

A web-based library management application where users can search for books,
borrow them, and manage lending operations based on user roles.

Book metadata is fetched from the Open Library API, while borrowing state
and user management are handled by a custom backend using Supabase and Netlify Functions.

---

## Features

- Book search by title or keyword
- Browse books by subject/category
- User authentication (login & registration)
- Role-based access:
  - Member
  - Librarian
  - Admin
- Borrow and return books
- User management (admin panel)
- Responsive UI with Material UI components

---

## Tech Stack

### Frontend
- React
- React Router
- Material UI (MUI)

### Backend
- Netlify Functions
- Supabase (PostgreSQL)
- bcrypt for password hashing

### External API
- Open Library API (search, subjects, covers)

---

## User Roles

| Role       | Permissions |
|------------|------------|
| Member     | Search books, borrow and return books |
| Librarian | View lending data |
| Admin      | Full user management (create, edit, delete users) |

---

## Application Flow

1. Users register or log in.
2. Based on their role, they are redirected to the appropriate page.
3. Users can search books using Open Library data.
4. Selected books can be added to a lending list.
5. Borrowing availability is validated by the backend.
6. Admins can manage users through a dedicated admin interface.

---

## API Overview

Backend functionality is implemented using Netlify Functions.

Examples:
- `POST /.netlify/functions/login`
- `POST /.netlify/functions/register`
- `PUT /.netlify/functions/update_user`
- `DELETE /.netlify/functions/delete_user`
- `GET /.netlify/functions/get_or_create_book`
- `POST /.netlify/functions/createBorrow`

Detailed API documentation can be found in the source code via JSDoc comments.

---

## Database Schema (Supabase)

### Users
- id
- username
- email
- password (hashed)
- type (member / librarian / admin)

### Books
- id
- external_key (Open Library key)
- title
- author
- cover_url

### Borrow Records
- id
- user_id
- book_id
- borrow_start
- return_date
- status

A book can have only one active borrow record at a time.

---

## Deployment

The application is deployed on **Netlify**.

Environment variables required:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Documentation Notes

- Backend endpoints are documented using JSDoc.
- Frontend pages include short descriptive comments for clarity.
- Utility and service modules are documented where they handle data logic.

---

## Author

Library Project – Student Assignment
