import { Card, CardMedia, CardHeader, CardContent, CardActions, Typography, Button, Box, Stack, Chip } from "@mui/material";
import { useEffect, useState } from "react";

export default function Cards({ book, handleInformation }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (book.cover_edition_key) {
            const url = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
            setImageUrl(url);
        } else {
            setImageUrl('https://www.globaluniversityalliance.org/wp-content/uploads/2017/10/No-Cover-Image-01.png');
        }
    }, []);



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
                image={imageUrl}
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
                    book?.author_name &&
                    <Typography variant="subtitle1">
                        {book?.author_name[0]}
                    </Typography>

                }

                {
                    book?.ebook_access &&
                    <Box>
                        <Typography 
                            variant="subtitle1"
                            sx={{
                                marginTop: '10px',
                            }}
                        >
                            Ebook access
                        </Typography>

                        <Stack
                            sx={{
                                flexDirection: 'row',
                                justifyContent: 'center',

                            }}
                        >


                            {
                                book.ebook_access === 'borrowable'
                                    ?
                                        <Chip label="Borrowable" color="success" />
                                    :
                                        <Chip label="No access" color="error" />
                            }
                        </Stack>
                    </Box>
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

                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            width: '100%'
                        }}
                        className="buttons"
                    >
                        Book lending
                    </Button>
                </Box>

            </CardActions>
        </Card >

    )
}