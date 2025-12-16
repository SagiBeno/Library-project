import { Box, Snackbar, Alert } from '@mui/material';

export default function SnackbarComponent( { open, message, onClose, vertical, horizontal } ) {
    return (
        <Box sx={{ width: 500 }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert
                    onClose={onClose}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}