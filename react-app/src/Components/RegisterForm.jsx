import { useState } from "react"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomTextField } from "./ComponentsOwnStyle";
import { Button, Typography, InputAdornment, IconButton, InputLabel, FormHelperText } from "@mui/material"
import { Link } from "react-router-dom";

export default function RegisterForm({ handleChange, formValues, handleSubmit }) {
    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirm: false,
    });

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '15px'
            }}
            autoComplete="off"
        >

            <InputLabel htmlFor='username' sx={{ textAlign: 'left', color: 'black' }}>Username</InputLabel>
            <CustomTextField
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
                                <IconButton onClick={() => setShowPassword({ ...showPassword, password: showPassword.password ? false : true })} sx={{ color: '#b08968' }}>
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
                formValues.password !== formValues.passwordConfirm && <FormHelperText sx={{ color: 'red', fontWeight: 'bold' }}>Passwords do not match!</FormHelperText>
            }

            <InputLabel htmlFor='passwordConfirm' sx={{ textAlign: 'left', marginTop: '20px', color: 'black' }}>Confrim Password</InputLabel>
            <CustomTextField
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
                                <IconButton onClick={() => setShowPassword({ ...showPassword, confirm: showPassword.confirm ? false : true })} sx={{ color: '#b08968' }}>
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
                formValues.password !== formValues.passwordConfirm && <FormHelperText sx={{ color: 'red', fontWeight: 'bold' }}>Passwords do not match!</FormHelperText>
            }

            {
                formValues.password.length < 8 && <FormHelperText sx={{ color: '#a97a4aff', fontWeight: 'bold' }}>Password must be at least 8 characters long!</FormHelperText>
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
                        Create account
                    </Button>

            }

        </form>
    )
}