import { Box, Paper, Typography, Container } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import RegisterForm from "../Components/RegisterForm";

import { registerUser } from "../utils";

export default function RegisterPage({ setIsLoading, snackbar, setSnackbar }) {
    const navigate = useNavigate();

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

        registerUser(formValues.username, formValues.password, formValues.email)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    setSnackbar({
                        open: true,
                        message: data.message || 'Registration failed! Please try again!',
                        severity: 'warning',
                    });
                }
                else {
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Registration successful! You can now log in.',
                        severity: 'success',
                    });
                    navigate('/');
                }
            })
            .catch((error) => {
                setSnackbar({
                    ...snackbar,
                    open: true,
                    message: 'An error occurred! Please try again!',
                    severity: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
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

                <RegisterForm handleChange={handleChange} formValues={formValues} handleSubmit={handleSubmit} />

            </Paper>
        </Container>
    )
}