import { Card, CardMedia, CardHeader, CardContent, CardActions, Typography, Button, Box, Stack, Chip } from "@mui/material"

export default function Cards({ book, handleInformation }) {
    console.log(book)
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
                cursor: 'pointer',
            }}
            className="cards"
        >
            <CardHeader title={book.title} />

            <CardMedia
                component="img"
                image={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
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

                <Stack
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    {/*TODO - Chip */}
                </Stack>
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
                    >
                        Book lending
                    </Button>
                </Box>

            </CardActions>
        </Card>

    )
}