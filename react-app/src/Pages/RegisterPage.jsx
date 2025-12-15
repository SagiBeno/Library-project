import { Box, Paper, Typography, Container } from "@mui/material"
import { Link } from "react-router-dom";
import { useState } from "react"
import RegisterForm from "../Components/RegisterForm";

export default function RegisterPage({ setIsLoading }) {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
    });

    const handleChange = (e) => {
        const formElement = e.target.name;
        const value = e.target.value;

        setFormValues({
            ...formValues,
            [formElement]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    }

    return (

        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
            className="container"
        >
            <Paper
                square={false}
                sx={{
                    textAlign: 'center',
                    padding: '10px',
                    minWidth: '60vw',
                }}
                elevation={3}
            >
                <Typography
                    variant="h5"
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                >
                    Create an account
                </Typography>

                <RegisterForm handleChange={handleChange} formValues={formValues} handleSubmit={handleSubmit}/>

            </Paper>
        </Container>
    )
}