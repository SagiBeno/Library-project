import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner(props) {
  return (
    <Box
        sx={{ 
            display: 'flex',
            minHeight: '100%',
            minWidth: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: '1',
            top: 0
        }}
    >
      <CircularProgress
        size={80}
        sx={{
            color: '#b08968',
        }}/>
    </Box>
  );
}