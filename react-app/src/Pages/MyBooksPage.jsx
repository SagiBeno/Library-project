/**
 * User books page.
 *
 * Displays the list of books currently borrowed by the logged-in user.
 * Borrowed books are retrieved by:
 * - Fetching borrow records for the user
 * - Resolving book metadata using external book identifiers
 *
 * The page automatically refreshes when the user's lending state changes.
 */

import { Container, Typography, Box, Button } from "@mui/material";
import { useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchCards } from '../Components/Cards';
import { MyBooksCard } from "../Components/Cards";

import { getAllBorrowsForUser, getBookById } from "../utils";

export default function MyBooksPage( {setIsLoading, snackbar, setSnackbar, lendedBooks, username} ) {
    const [books, setBooks] = useState(lendedBooks || []);

    useEffect(() => {
        async function fetchLendedBooks() {
            setIsLoading(true);

            const bookExternalKeys = [];

            const res = await getAllBorrowsForUser(username);

            if (res.ok) {
                const data = await res.json();

                setSnackbar({
                    ...snackbar,
                    open: true,
                    message: 'Data retrieval successful!',
                    severity: 'success'
                });

                bookExternalKeys.push(...data.book_keys.map(b => b.external_key));
            } else {
                setSnackbar({
                    ...snackbar,
                    open: true,
                    message: 'Error retrieving data!',
                    severity: 'error'
                });
            }

            const bookPromises = [];

            for (const external_key of bookExternalKeys) {
                bookPromises.push(getBookById(external_key));
            }

            const bookResponses = await Promise.all(bookPromises);

            const books = [];

            for (const res of bookResponses) {
                if (res.ok) {
                    const data = await res.json();
                    books.push(data.data);
                } else {
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Error retrieving data!',
                        severity: 'error'
                    });
                }
            }

            setBooks(books);

            setIsLoading(false);
        }
        fetchLendedBooks();
    }, [lendedBooks]);

    return (
        <Container className="container">

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around'
                }}
            >
                {
                    books.length > 0
                        ?
                        books.map((book, idx) => {
                            return (
                                <MyBooksCard book={book} key={idx} />
                            )
                        })
                        :
                        <Typography variant="h5">
                            No data available
                        </Typography>
                }

            </Box>
        </Container>
    )
}