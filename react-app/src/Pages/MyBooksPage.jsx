import { Container, Typography, Box, Button } from "@mui/material";
import { useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchCards } from '../Components/Cards';

import { getAllBorrowsForUser, getBookById } from "../utils";

export default function MyBooksPage(props) {
    const [books, setBooks] = useState(props.lendedBooks || []);

    useEffect(() => {
        async function fetchLendedBooks() {
            props.setIsLoading(true);

            const bookExternalKeys = [];

            const res = await getAllBorrowsForUser(props.username);

            if (res.ok) {
                const data = await res.json();

                console.log("Borrowed books data:", data);

                bookExternalKeys.push(...data.book_keys.map(b => b.external_key));
            } else {
                console.error("Failed to fetch lended books");
            }

            console.log("Book external keys:", bookExternalKeys);

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
                    console.error("Failed to fetch book by id");
                }
            }

            setBooks(books);

            props.setIsLoading(false);
        }
        fetchLendedBooks();
    }, [props.lendedBooks]);

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
                                <div>{book.title}</div>
                            )
                        })
                        :
                        <Typography variant="h5">
                            igen
                        </Typography>
                }
            </Box>
        </Container>
    )
}