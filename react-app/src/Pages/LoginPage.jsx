import { Box, Paper, TextField, FormControl, Button, Typography, InputLabel } from "@mui/material"
import { Link } from "react-router-dom";
import { useState } from "react"

export default function LoginPage(props) {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
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
    }

    return (

        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'

        }}>
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
                >
                    Login
                </Typography>

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '15px'
                    }}
                >
                    <InputLabel htmlFor='email' sx={{textAlign: 'left'}}>Email Address</InputLabel>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={(e) => handleChange(e)}
                        value={formValues.email}
                        placeholder='Eg. example@email.com'
                        name='email'
                        required
                        sx={{
                            marginBottom: '20px'
                        }}
                    />

                    <InputLabel htmlFor='password' sx={{textAlign: 'left'}}>Password</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => handleChange(e)}
                        value={formValues.password}
                        name='password'
                        required
                        sx={{
                            marginBottom: '20px'
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        Login
                    </Button>

                    <Typography variant="subtitle1">
                        Don't have an account? <Link to='/register'>Register here</Link>
                    </Typography>
                </form>

            </Paper>
        </Box>
    )
}