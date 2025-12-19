import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function AdminTable( { data, handleEdit, handleDelete } ) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map( ({id, username, email}, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{username}</TableCell>
                                <TableCell>{email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={(e) => handleEdit(e)} value={id}>
                                        <EditIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    {
                                        username === localStorage.getItem('username').replaceAll('"', '')
                                            ?
                                                <IconButton disabled>   
                                                    <DeleteIcon sx={{color: 'lightgray'}} />
                                                </IconButton>
                                            :
                                                <IconButton onClick={(e) => handleDelete(e)} value={id}>
                                                    <DeleteIcon sx={{color: 'red'}} />
                                                </IconButton>
                                    }
                                    
                                </TableCell>
                            </TableRow>
                            
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}