import LoginPage from "./LoginPage"
import { Container } from "@mui/material"

export default function HomePage ({ setIsLoading }) {

    // TODO - login and register page
    return (
        <Container>
            <LoginPage setIsLoading={setIsLoading} />
        </Container>
    )
}