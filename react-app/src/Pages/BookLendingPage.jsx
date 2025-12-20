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
import { ConfirmModal } from "../Components/Modals";

import { handleBook, getBookBorrowInfo, createBookBorrow } from '../utils';

const processedBookKeys = new Set();

export default function BookLendingPage({ setIsLoading, username, snackbar, setSnackbar }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [lendedBooks, setLendedBooks] = useState(() => {
        const savedLendedBooks = localStorage.getItem('lendedBooks');
        return savedLendedBooks ? JSON.parse(savedLendedBooks) : '';
    });
    const [lentOutBooks, setLentOutBooks] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {

        async function checkBooks() {
            setIsLoading(true)
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

            const borrowInfoPromises = [];

            for (let i = 0; i < responses.length; i++) {
                const res = responses[i];
                if (res.ok) {
                    const data = await res.json();
                    const book_id = data?.data[0].id;

                    borrowInfoPromises.push(getBookBorrowInfo(book_id));
                }
            }

            const borrowResponses = await Promise.all(borrowInfoPromises);

            for (let i = 0; i < borrowResponses.length; i++) {
                const res = borrowResponses[i];
                if (res.ok) {
                    const data = await res.json();

                    if (data.data.length != 0) {
                        setLentOutBooks(...lentOutBooks, lendedBooks.filter((book) => (
                            book.title === toProcess[i].title
                        )))

                        setShowConfirmModal(true);
                    }
                }
            }

            setIsLoading(false)
        }
        checkBooks();

    }, []);

    const handleRemove = (book) => {
        const idx = lendedBooks.indexOf(book);
        const newLendedBooks = [...lendedBooks];
        newLendedBooks.splice(idx, 1);
        localStorage.setItem('lendedBooks', JSON.stringify(newLendedBooks));
        setLendedBooks(newLendedBooks);
    }

    const handleConfirm = () => {

        const processLending = async () => {
            setIsLoading(true);

            const promises = [];

            for (const book of lendedBooks) {
                const res = await createBookBorrow(username, book.key, 30) //30 days borrow length

                promises.push(res);
            }

            await Promise.all(promises);

            for (const promise of promises) {
                const res = await promise;
                if (res.ok) {
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Lending recorded successfully!',
                        severity: 'success'
                    });
                    navigate('/my-books');
                    setLendedBooks([])
                    localStorage.setItem('lendedBooks', JSON.stringify([]));
                } else {
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Error recording lending!',
                        severity: 'error'
                    });
                }
            }

            setIsLoading(false);
        };

        processLending();
    }

    const handleCancel = () => {
        setLendedBooks([]);
        localStorage.setItem('lendedBooks', JSON.stringify([]))
        navigate('/serach');
    }

    const handleConfirmModal = (data) => {

        data.map((book) => {
            const idx = lendedBooks.indexOf(book);
            const newLendedBooks = [...lendedBooks];
            newLendedBooks.splice(idx, 1);
            localStorage.setItem('lendedBooks', JSON.stringify(newLendedBooks));
            setLendedBooks(newLendedBooks);
        })
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

            {
                lentOutBooks.length > 0 && <ConfirmModal showConfirmModal={showConfirmModal} setShowConfirmModal={setShowConfirmModal} data={lentOutBooks} handleConfirm={handleConfirmModal} handleCancel={handleCancel} />
            }
        </Container>
    )
}