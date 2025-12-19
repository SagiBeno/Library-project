import { Container, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBooksByQuery, fetchBooksBySubject } from '../utils'
import { SearchCards } from '../Components/Cards'
import SearchComponent from "../Components/SearchComponent";
import Subjects from "../Components/Subjects";

export default function SearchPage({ setIsLoading, setLendedBooks, lendedBooks, snackbar, setSnackbar }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [subjects, setSubjects] = useState([
        { label: "Fantasy", value: "fantasy" },
        { label: "Science Fiction", value: "science_fiction" },
        { label: "Romance", value: "romance" },
        { label: "Mystery", value: "mystery" },
        { label: "Thriller", value: "thriller" },
        { label: "Horror", value: "horror" },

        { label: "History", value: "history" },
        { label: "Biography", value: "biography" },
        { label: "Philosophy", value: "philosophy" },
        { label: "Psychology", value: "psychology" },
        { label: "Sociology", value: "sociology" },

        { label: "Programming", value: "programming" },
        { label: "Computer Science", value: "computer_science" },
        { label: "Artificial Intelligence", value: "artificial_intelligence" },
        { label: "Data Science", value: "data_science" },

        { label: "Science", value: "science" },
        { label: "Mathematics", value: "mathematics" },
        { label: "Physics", value: "physics" },

        { label: "Children", value: "children" },
        { label: "Young Adult", value: "young_adult" },

        { label: "Poetry", value: "poetry" },
        { label: "Drama", value: "drama" },
        { label: "Classics", value: "classics" },

        { label: "Travel", value: "travel" },
        { label: "Cooking", value: "cooking" },
        { label: "Health", value: "health" }
    ]);

    const [resultText, setResultText] = useState('Start typing or select a category to browse books!');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const normalizeBook = (item) => ({
        title: item.title,
        author: item.author_name?.[0] || item.authors?.[0]?.name || "Unknown",
        cover_edition_key: item?.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg` : 'https://www.globaluniversityalliance.org/wp-content/uploads/2017/10/No-Cover-Image-01.png',
        status: 'borrowable',
        create_at: item?.first_publish_year,
        key: item?.key.split('/')[2]
    });

    const handleSearch = async () => {
        setBooks([]);
        setResultText('');

        if (searchQuery.trim() === '' || searchQuery.length < 3) {
            setSnackbar({
                ...snackbar,
                open: true,
                message: 'Please enter at least 3 characters to search!',
                severity: 'warning'
            });
        } else {
            setIsLoading(true);
            await fetchBooksByQuery(searchQuery.trim().replaceAll(' ', '+'))
                .then((res) => {
                    if (res?.docs && res.docs.length > 0) {
                        setBooks(res.docs.map( (book) => normalizeBook(book)));
                    } else {
                        setBooks([]);
                        setSnackbar({
                            ...snackbar,
                            open: true,
                            message: 'No results found!',
                            severity: 'info',
                        });
                        setResultText('No results found!');
                    }
                })
                .catch(console.warn)
                .finally(() => setIsLoading(false));
        }
    }

    const handleSubjectClick = async (subject) => {
        setBooks([]);
        setResultText('');
        setIsLoading(true);
        await fetchBooksBySubject(subject)
            .then((res) => {
                if (res?.works && res.works.length > 0) {
                    setBooks(res.works.map( (book) => normalizeBook(book)));
                } else {
                    setBooks([]);
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'No results found!',
                        severity: 'info',
                    });
                    setResultText('No results found!');
                }
            })
            .catch(console.warn)
            .finally(() => setIsLoading(false));
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
                    justifyContent: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                }}
            >
                <Subjects subjects={subjects} handleSubjectClick={handleSubjectClick} />
            </Box>

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
                        books.map((book, idx) => <SearchCards book={book} key={idx} handleLendBook={handleLendBook} lendedBooks={lendedBooks} />)
                        :
                        <Typography variant="h5">
                            {resultText}
                        </Typography>
                }
            </Box>
        </Container>
    )
}