import { Card, CardMedia, CardHeader, CardContent, CardActions, Typography, Button, Box, Stack, Chip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export function SearchCards({ book, handleLendBook, lendedBooks }) {

    return (
        <Card
            sx={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '10px',
                boxShadow: '0px 0px 10px 0px gray',
                padding: '5px',
            }}
            className="cards"
        >
            <CardHeader title={book.title} />

            <CardMedia
                component="img"
                image={book.cover_edition_key}
                alt={book.title}
                sx={{
                    width: '60%',
                    maxHeight: '400px',
                    margin: '0 auto',
                }}
                title={book.title}
                loading='lazy'
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">
                    Author
                </Typography>
                <Typography variant="body2">
                    {book?.author}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    Status
                </Typography>

                <Stack
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'center',

                    }}
                >

                    <Chip label="Borrowable" color="success" />

                </Stack>

                <Typography
                    variant="subtitle1"
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    First publish year: {book.create_at}
                </Typography>

            </CardContent>

            <CardActions
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mt: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <Box>
                    {
                        (book?.status && book.status === 'borrowable' && !lendedBooks.includes(book))
                            ?
                            <Button
                                type="button"
                                variant="contained"
                                sx={{
                                    width: '100%'
                                }}
                                className="buttons"
                                onClick={() => handleLendBook(book)}
                            >
                                Book lending
                            </Button>
                            :
                            <Button
                                disabled
                                type="button"
                                variant="contained"
                                sx={{
                                    width: '100%'
                                }}
                            >
                                {lendedBooks.includes(book) ? 'Added to lending list' : 'Not available for lending'}
                            </Button>
                    }
                </Box>

            </CardActions>
        </Card >

    )
}

export function LendingCards({ handleRemove, lendedBook }) {

    return (
        <Card
            sx={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '10px',
                boxShadow: '0px 0px 10px 0px gray',
                padding: '5px',
            }}
            className="cards"
        >
            <CardHeader title={lendedBook.title} />

            <CardMedia
                component="img"
                image={lendedBook.cover_edition_key}
                alt={lendedBook.title}
                sx={{
                    width: '60%',
                    maxHeight: '400px',
                    margin: '0 auto',
                }}
                title={lendedBook.title}
                loading='lazy'
            />

            <CardContent sx={{ flexGrow: 1 }}>
                {
                    lendedBook?.author &&
                    <>
                        <Typography variant="subtitle1">
                            Author
                        </Typography>
                        <Typography variant="body2">
                            {lendedBook?.author}
                        </Typography>
                    </>


                }
            </CardContent>

            <CardActions
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mt: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <IconButton onClick={() => handleRemove(lendedBook)}>
                    <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>

            </CardActions>
        </Card >
    )
}


export function MyBooksCard({ book }) {

    return (
        <Card
            sx={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '10px',
                boxShadow: '0px 0px 10px 0px gray',
                padding: '5px',
            }}
            className="cards"
        >
            <CardHeader title={book.title} />

            <CardMedia
                component="img"
                image={book.cover_url}
                alt={book.title}
                sx={{
                    width: '60%',
                    maxHeight: '400px',
                    margin: '0 auto',
                }}
                title={book.title}
                loading='lazy'
            />

            <CardContent sx={{ flexGrow: 1 }}>
                {
                    book?.author &&
                    <>
                        <Typography variant="subtitle1">
                            Author
                        </Typography>
                        <Typography variant="body2">
                            {book?.author}
                        </Typography>
                    </>


                }
            </CardContent>
        </Card >
    )
}

