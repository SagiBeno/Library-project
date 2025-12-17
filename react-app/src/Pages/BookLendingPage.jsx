import { Container, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LendingCards } from '../Components/Cards';

export default function BookLendingPage({ setIsLoading }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [lendedBooks, setLendedBooks] = useState(location.state.books != null ? location.state.books : []);

    const handleRemove = (book) => {
        const idx = lendedBooks.indexOf(book);
        const newLendedBooks = [...lendedBooks];
        newLendedBooks.splice(idx, 1);
        setLendedBooks(newLendedBooks);
    }

    const handleConfirm = () => {
        navigate('/my-books');
        // TODO - SUPABASE
    }

    return (
        <Container className="container">
            {
                lendedBooks.length > 0
                    ?   
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
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
                    <Typography variant="h5" sx={{textAlign: 'center', marginTop: '20px'}}>
                        You have not lended any books yet!
                    </Typography>
            }
        </Container>
    )
}