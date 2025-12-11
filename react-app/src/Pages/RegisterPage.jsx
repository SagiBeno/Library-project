import { Box, Paper, TextField, FormControl, Button, Typography, InputAdornment, IconButton, InputLabel } from "@mui/material"
import { Link } from "react-router-dom";
import { useState } from "react"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function RegisterPage(props) {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirm: false,
    });

    const handleChange = (e) => {
        const formElement = e.target.name;
        const value = e.target.value;

        setFormValues({
            ...formValues,
            [formElement]: value
        });
    }

    const handleShowPassword = () => {
        const show = showPassword ? false : true;
        setShowPassword(show);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
    }

    return (

        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',

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
                    Register
                </Typography>

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '15px'
                    }}
                    autoComplete="off"
                >

                    <InputLabel htmlFor='username' sx={{textAlign: 'left'}}>Username</InputLabel>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={formValues.username}
                        placeholder='Username'
                        name='username'
                        required
                        sx={{
                            marginBottom: '20px',
                            marginTop: '10px'
                        }}
                    />

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
                            marginBottom: '20px',
                            marginTop: '10px'
                        }}
                    />
                
                    <InputLabel htmlFor='password' sx={{textAlign: 'left'}}>Password</InputLabel>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type={showPassword.password ? 'text' : 'password'}
                        onChange={(e) => handleChange(e)}
                        value={formValues.password}
                        name='password'
                        placeholder="Password"
                        required
                        sx={{
                            marginBottom: '20px',
                            marginTop: '10px'
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword( { ...showPassword, password: showPassword.password ? false : true } )}>
                                            <RemoveRedEyeIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <InputLabel htmlFor='passwordConfirm' sx={{textAlign: 'left'}}>Confrim Password</InputLabel>
                    <TextField
                        id="passwordConfirm"
                        label="Confirm password"
                        variant="outlined"
                        type={showPassword.confirm ? 'text' : 'password'}
                        onChange={(e) => handleChange(e)}
                        value={formValues.passwordConfirm}
                        name='passwordConfirm'
                        placeholder="Confirm password"
                        required
                        sx={{
                            marginBottom: '20px',
                            marginTop: '10px'
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword( { ...showPassword, confirm: showPassword.confirm ? false : true } )}>
                                            <RemoveRedEyeIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            marginBottom: '20px'
                        }}
                    >
                        Register
                    </Button>
                </form>

            </Paper>
        </Box>
    )
}