import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BookLendingPage({ setIsLoading }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [lendedBooks, setLendedBooks] = useState(location.state.books != null ? location.state.books : []);


    return (
        <Container>
            {
                lendedBooks.length > 0
                    ?
                        <div></div>
                    :
                    <Typography variant="h5">
                        You have not lended any books yet!
                    </Typography>

            }
        </Container>
    )
}