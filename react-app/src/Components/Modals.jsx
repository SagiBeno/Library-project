import { Modal, Box, Typography, InputLabel, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material"
import { CustomTextField } from './ComponentsOwnStyle'
import { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export function EditModal({ showEditModal, setShowEditModal, data, handleSave }) {
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
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
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

                        <CustomTextField
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

                        <CustomTextField
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

                        <CustomTextField
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
                        <Button
                            variant="contained"
                            onClick={() => setShowEditModal(false)}
                            sx={{
                                backgroundColor: '#bcb8b1',
                                color: 'black'
                            }}
                            className='cancelButtons'
                            startIcon={<CancelIcon />}
                        >
                            Cancel
                        </Button>

                        {
                            data[0].username === textFieldData.username && data[0].email === textFieldData.email && data[0].password === textFieldData.password
                                ?
                                <Button
                                    disabled
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#29bf12',
                                    }}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#29bf12',
                                    }}
                                    onClick={() => {
                                        handleSave({ ...textFieldData });
                                        setShowEditModal(false);
                                    }}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>

                        }
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export function DeleteModal({ showDeleteModal, setShowDeleteModal, data, handleDeleteConfirm }) {
    return (
        <div>
            <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
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
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        You want to delete the following user
                    </Typography>

                    <TableContainer
                        sx={{overflow: 'auto'}}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.map( ({id, username, email }, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell>{username}</TableCell>
                                            <TableCell>{email}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box className='modalButtons' sx={{marginTop: '20px'}}>
                        <Button
                            variant="contained"
                            onClick={() => setShowDeleteModal(false)}
                            sx={{
                                backgroundColor: '#bcb8b1',
                                color: 'black'
                            }}
                            className="cancelButtons"
                            startIcon={<CancelIcon />}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                handleDeleteConfirm(data);
                                setShowDeleteModal(false);
                            }}
                            sx={{
                                backgroundColor: 'red',
                            }}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </div>
    )
}