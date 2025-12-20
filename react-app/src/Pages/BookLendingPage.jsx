/**
 * Book lending page.
 *
 * Displays the list of books selected by the user for borrowing.
 * Allows users to review selected books, remove items from the list,
 * and confirm the lending process.
 *
 * Book availability and borrowing state are handled by backend validation.
 */

import { Container, Typography, Box, Button } from "@mui/material";
import { useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LendingCards } from '../Components/Cards';

import { handleBook } from '../utils';

const processedBookKeys = new Set();

export default function BookLendingPage({ setIsLoading }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [lendedBooks, setLendedBooks] = useState(location.state.books != null ? location.state.books : []);

    useEffect(() => {
        console.log('Lended books:', lendedBooks);
        //TODO check if books are in database, if not create them
        async function checkBooks() {
            const toProcess = [];
            for (const book of lendedBooks) {
                if (processedBookKeys.has(book.key)) continue;
                processedBookKeys.add(book.key);
                toProcess.push(book);
            }

            if (toProcess.length === 0) return;

            const responses = await Promise.all(
                toProcess.map(b => handleBook(b.key, b.title, b.author, b.cover_edition_key))
            );

            for (const res of responses) {
                try {
                    const data = await res.json();
                    console.log('Book check/create response data:', data);
                } catch (e) {
                    console.error('Failed to parse book response');
                }
            }

        }
        checkBooks();

        //TODO if in database, check if available

    }, [lendedBooks]);

    const handleRemove = (book) => {
        const idx = lendedBooks.indexOf(book);
        const newLendedBooks = [...lendedBooks];
        newLendedBooks.splice(idx, 1);
        setLendedBooks(newLendedBooks);
    }

    const handleConfirm = () => {
        //navigate('/my-books');

        console.log('Confirmed lending:', lendedBooks);

        //TODO check each book in lendedBooks array is borrowable

        //TODO if available, update the book to be lent by the user 

    }

    return (
        <Container className="container">
            {
                lendedBooks.length > 0
                    ?
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
                            {
                                lendedBooks.map((book, idx) => <LendingCards handleRemove={handleRemove} lendedBook={book} key={idx} />)
                            }
                        </Box>


                        <Button
                            sx={{
                                margin: '0 auto',
                                marginTop: '20px'
                            }}
                            className="buttons"
                            onClick={() => handleConfirm()}
                        >
                            Confirm lending
                        </Button>
                    </Box>

                    :
                    <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '20px' }}>
                        You have not lended any books yet!
                    </Typography>
            }
        </Container>
    )
}