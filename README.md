# Library Project – Book Borrowing System

A web application for managing a small library system.  
Users can browse books, borrow and return them, while administrators can manage users and monitor borrowing activity.

The application uses the Open Library API for book metadata and a custom backend for handling borrowing logic and user management.

---

## Features

### User Features
- Browse books by search query or subject (genre)
- View book details and cover images
- Add books to a lending list
- Borrow and return books
- View personal borrowed books

### Authentication
- User registration
- Secure login with hashed passwords
- Role-based access (member, librarian, admin)

### Admin Features
- View users filtered by role
- Search users by username or email
- Create new users
- Edit existing users
- Delete users

---

## Tech Stack

### Frontend
- React
- Material UI (MUI)
- React Router

### Backend
- Netlify Functions (Serverless)
- Supabase (PostgreSQL)
- bcrypt for password hashing

### External API
- Open Library API (book metadata and covers)

---

## Application Architecture

- **Frontend** handles UI, user interaction and state management
- **Backend** handles authentication, user management and borrowing logic
- **Database** stores users, books and borrow records
- **Open Library API** provides book metadata (title, author, cover)

Borrowing state and availability are always handled by the backend database, not by the external API.

---

## Pages Overview

### Search Page
- Search books by keyword
- Browse books by subject
- Add books to lending list

### Lending Page
- Review selected books
- Remove books from the lending list
- Confirm borrowing (validated by backend)

### Login Page
- Authenticate users
- Redirect users based on role

### Register Page
- Create new user accounts

### Admin Page
- Manage users (view, create, edit, delete)
- Filter users by role
- Search users

---

## API Overview

Backend functionality is implemented using Netlify Functions.

### Authentication
- `POST /.netlify/functions/login`
- `POST /.netlify/functions/register`

### User Management
- `GET /.netlify/functions/get_users_by_type`
- `PUT /.netlify/functions/update_user`
- `DELETE /.netlify/functions/delete_user`

### Books & Borrowing
- `GET /.netlify/functions/get_or_create_book`
- `POST /.netlify/functions/createBorrow`

All API endpoints are documented using JSDoc comments and described in detail in the source code.

---

## Database Schema (Simplified)

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

A book can only have one active borrow record at a time.

---

## Deployment

The application is deployed on **Netlify**.

### Environment Variables
The following environment variables are required:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These are configured in the Netlify dashboard.

---

## Design Decisions & Challenges

- The Open Library API returns inconsistent data structures, so a normalization layer was implemented on the frontend.
- Borrowing availability is handled exclusively in the backend to ensure data consistency.
- The application separates book metadata (external API) from application state (database).
- Serverless functions were chosen for simplicity and scalability.

---

## Author

Library Project  
Frontend-focused implementation with documented backend integration.
