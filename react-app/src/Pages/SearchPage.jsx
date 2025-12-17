import { Container, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBooksByQuery } from '../utils'
import { SearchCards } from '../Components/Cards'
import SearchComponent from "../Components/SearchComponent";
export default function SearchPage( { setIsLoading, setLendedBooks, lendedBooks, snackbar, setSnackbar } ) {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = async () => {
        
        if (searchQuery.trim() === '' || searchQuery.length < 3) {
            setSnackbar({
                ...snackbar, 
                open: true, 
                message: 'Please enter at least 3 characters to search!',
                severity: 'warning'
            });
        } else {
            setIsLoading(true);
            await fetchBooksByQuery(searchQuery.replace(' ', '+'))
                .then( (res) => {
                    if (res?.docs && res.docs.length > 0) {
                        setBooks([...res.docs]);
                    } else {
                        setBooks([]);
                        setSnackbar({
                            ...snackbar,
                            open: true,
                            message: 'No results found!',
                            severity: 'info',
                        });
                    }
                })
                .catch(console.warn)
                .finally(() => setIsLoading(false));
        }
    }

    const handleLendBook = (book) => {
        setLendedBooks([...lendedBooks, book]);
        setSnackbar({
            ...snackbar,
            open: true,
            message: `"${book.title}" has been added to your lending list!`,
            severity: 'success',
        });
    }

    return (
        <Container className="container">
            <SearchComponent handleChange={handleChange} handleSearch={handleSearch} searchQuery={searchQuery} />

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
                            books.map( (book, idx) => <SearchCards book={book} key={idx} handleLendBook={handleLendBook} lendedBooks={lendedBooks} />)
                        :
                            <Typography variant="h5">
                                No results found!
                            </Typography>
                }
            </Box>
        </Container>
    )
}