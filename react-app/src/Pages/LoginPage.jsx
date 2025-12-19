import { Box, Paper, TextField, FormControl, Button, Typography, InputLabel, IconButton, InputAdornment, Container } from "@mui/material"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { CustomTextField } from "../Components/ComponentsOwnStyle";
import { authenticateUser } from "../utils";

export default function LoginPage({ setIsLoading, setLoggedIn, setUserType, setUsername, snackbar, setSnackbar }) {
    const navigate = useNavigate();

    if (localStorage.getItem('loggedIn') === 'true') {
        navigate('/search');
    }

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const formElement = e.target.name;
        const value = e.target.value;

        setFormValues({
            ...formValues,
            [formElement]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await authenticateUser(formValues.email, formValues.password);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            setSnackbar({...snackbar, 
                open: true,
                message: 'Invalid email or password. Please try again!',
                severity: 'error'
            });
            setIsLoading(false);
            return;
        }
        else {
            setIsLoading(false);
            setUserType(data?.user?.type || 'member');
            setUsername(data?.user?.username || '');
            setLoggedIn(true);
            // Set user type returned by backend: member, librarian, admin
            setSnackbar({...snackbar, 
                open: true,
                message: 'Login successful!',
                severity: 'success'
            });

            if (data?.user?.type === 'admin') navigate('/admin');
            if (data?.user?.type === 'librarian') navigate('/librarian');
            if (data?.user?.type === 'member') navigate('/my-books');
        }

    }

    return (
        <Container className="container" >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
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
                        <InputLabel htmlFor='email' sx={{ textAlign: 'left', color: 'black' }}>Email Address</InputLabel>
                        <CustomTextField
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

                        <InputLabel htmlFor='password' sx={{ textAlign: 'left', color: 'black' }}>Password</InputLabel>
                        <CustomTextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            onChange={(e) => handleChange(e)}
                            value={formValues.password}
                            name='password'
                            required
                            sx={{
                                marginBottom: '20px',
                                marginTop: '10px',
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(showPassword ? false : true)} sx={{ color: '#b08968' }}>
                                                {
                                                    showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {
                            formValues.password.length === 0 || formValues.email.length === 0
                                ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginBottom: '20px'
                                    }}
                                    disabled
                                >
                                    Login
                                </Button>
                                :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginBottom: '20px'
                                    }}
                                    className="buttons"
                                >
                                    Login
                                </Button>
                        }

                        <Typography variant="subtitle1">
                            Do not have an account? <Link to='/register' className="link">Register here</Link>
                        </Typography>
                    </form>

                </Paper>
            </Box>
        </Container>
    )
}