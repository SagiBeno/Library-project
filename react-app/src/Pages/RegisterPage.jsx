import { Box, Paper, TextField, FormControl, Button, Typography, InputAdornment, IconButton, InputLabel, FormHelperText } from "@mui/material"
import { Link } from "react-router-dom";
import { useState } from "react"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LoginTextField } from "./CssTextField";

export default function RegisterPage( { setIsLoading } ) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    }

    return (

        <Box sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '20px'
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
                    sx={{fontWeight: 'bold'}}
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

                    <InputLabel htmlFor='username' sx={{textAlign: 'left', color: 'black'}}>Username</InputLabel>
                    <LoginTextField
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

                    <InputLabel htmlFor='email' sx={{textAlign: 'left', color: 'black'}}>Email Address</InputLabel>
                    <LoginTextField
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
                
                    <InputLabel htmlFor='password' sx={{textAlign: 'left', color: 'black'}}>Password</InputLabel>
                    <LoginTextField
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
                            marginTop: '10px'
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword( { ...showPassword, password: showPassword.password ? false : true } )} sx={{color: '#b08968'}}>
                                            {
                                                showPassword.password ? <VisibilityOffIcon /> : <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {
                        formValues.password !== formValues.passwordConfirm && <FormHelperText sx={{color: 'red', fontWeight: 'bold'}}>Passwords do not match!</FormHelperText>
                    }

                    <InputLabel htmlFor='passwordConfirm' sx={{textAlign: 'left', marginTop: '20px', color: 'black'}}>Confrim Password</InputLabel>
                    <LoginTextField
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
                            marginTop: '10px'
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword( { ...showPassword, confirm: showPassword.confirm ? false : true } )} sx={{color: '#b08968'}}>
                                            {
                                                showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {
                        formValues.password !== formValues.passwordConfirm && <FormHelperText sx={{color: 'red', fontWeight: 'bold'}}>Passwords do not match!</FormHelperText>
                    }
                    
                    {
                        formValues.password !== formValues.passwordConfirm || formValues.password.length === 0 || formValues.username.length === 0 || formValues.email.length === 0
                            ? 
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginTop: '20px',
                                    }}
                                    disabled
                                >
                                    Register
                                </Button>
                            :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginTop: '20px',
                                    }}
                                    className="buttons"
                                >
                                    Register
                                </Button>

                    }
                    
                </form>

            </Paper>
        </Box>
    )
}