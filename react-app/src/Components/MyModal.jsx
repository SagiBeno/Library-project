import { Modal, Box, Typography, InputLabel, Button } from "@mui/material"
import { LoginTextField } from './CssTextField'
import { useState } from "react"

export default function MyModal({ showModal, setShowModal, data, handleSave }) {
    const [textFieldData, setTextFieldData] = useState({
        id: data[0].id,
        username: data[0].username,
        email: data[0].email,
        password: data[0].password
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTextFieldData({
            ...textFieldData,
            [name]: value
        });
    }

    return (
        <div>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50vw',
                        maxHeight: '80vh',
                        overflowX: 'auto',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User to be edited: {data[0].username}
                    </Typography>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            marginTop: '20px',
                        }}
                    >

                        <InputLabel htmlFor='email' sx={{ textAlign: 'left', color: 'black' }}>Username</InputLabel>

                        <LoginTextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={textFieldData.username}
                            name='username'
                            sx={{
                                marginBottom: '20px',
                                marginTop: '10px',
                                width: '100%'
                            }}
                        />

                        <InputLabel htmlFor='email' sx={{ textAlign: 'left', color: 'black' }}>Email Address</InputLabel>

                        <LoginTextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            onChange={(e) => handleChange(e)}
                            value={textFieldData.email}
                            placeholder='Eg. example@email.com'
                            name='email'
                            sx={{
                                marginBottom: '20px',
                                marginTop: '10px',
                                width: '100%'
                            }}
                        />

                        <InputLabel htmlFor='email' sx={{ textAlign: 'left', color: 'black' }}>Password</InputLabel>

                        <LoginTextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => handleChange(e)}
                            value={textFieldData.password}
                            name='password'
                            sx={{
                                marginBottom: '20px',
                                marginTop: '10px',
                                width: '100%'
                            }}
                        />
                    </Box>

                    <Box className='modalButtons'>
                        {
                            data[0].username === textFieldData.username && data[0].email === textFieldData.email && data[0].password === textFieldData.password
                                ?
                                    <Button
                                        disabled
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#29bf12',
                                        }}
                                        id='modalSaveButton'
                                    >
                                        Save
                                    </Button>
                                :
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#29bf12',
                                        }}
                                        id='modalSaveButton'
                                        onClick={() => {
                                            handleSave({...textFieldData});
                                            setShowModal(false);
                                        }}

                                    >
                                        Save
                                    </Button>
                                    
                        }

                        <Button
                            variant="contained"
                            onClick={() => setShowModal(false)}
                            sx={{
                                backgroundColor: 'red',
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}