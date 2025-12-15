import { Container, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBooksByQuery } from '../utils'
import Cards from '../Components/Cards'
import SearchComponent from "../Components/SearchComponent";

export default function SearchPage( { setIsLoading } ) {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const data = await fetchBooksByQuery(searchQuery.replace(' ', '+'));
            setBooks([...data.docs]);
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
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
            
        </Container>
    )
}