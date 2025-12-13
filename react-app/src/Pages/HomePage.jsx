import LoginPage from "./LoginPage"
import { Container } from "@mui/material"

export default function HomePage ({ setIsLoading }) {

    return (
        <Container className="container">
            <LoginPage setIsLoading={setIsLoading} />
        </Container>
    )
}