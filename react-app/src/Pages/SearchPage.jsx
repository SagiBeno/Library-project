import { Container, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBooksByQuery } from '../utils'
import Cards from '../Components/Cards'
import SearchComponent from "../Components/SearchComponent";
import SnackbarComponent from "../Components/SnackbarComponent";

export default function SearchPage( { setIsLoading } ) {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
        severity: 'warning',
    });

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = async () => {
        
        if (searchQuery.trim() === '' || searchQuery.length < 3) {
            setSnackbar({...snackbar, open: true, message: 'Please enter at least 3 characters to search!'});
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
                        });
                    }
                })
                .catch(console.warn)
                .finally(() => setIsLoading(false));
        }
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
                            books.map( (book, idx) => <Cards book={book} key={idx} /> )
                        :
                            <Typography variant="h5">
                                No results found!
                            </Typography>
                }
            </Box>
            
            <SnackbarComponent 
                open={snackbar.open} 
                message={snackbar.message}
                vertical={snackbar.vertical}
                horizontal={snackbar.horizontal} 
                severity={snackbar.severity}
                onClose={() => setSnackbar({...snackbar, open: false, message: ''})} 
            />

            
        </Container>
    )
}