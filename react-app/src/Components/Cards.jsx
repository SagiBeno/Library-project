import { Card, CardMedia, CardHeader, CardContent, CardActions, Typography } from "@mui/material"

export default function Cards({ book }) {
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
                cursor: 'pointer'
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

            {
                book?.author_name && 
                <CardContent>
                    <Typography variant="subtitle1">
                        {book?.author_name[0]}
                    </Typography>
                </CardContent>
            }

            
        </Card>

    )
}