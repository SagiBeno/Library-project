import { Select, TextField } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';

export const CustomTextField = styled(TextField)({
    '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: '#ddb892',
    },

    '& label.Mui-focused': {
        color: '#b08968',
    },

    '& .MuiInput-underline:after': {
        borderBottomColor: '#b08968',
    },

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#b08968',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#b08968',
        },
    },
});

export const CustomSelect = styled(Select)({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b08968',
    },
    '&.Miu-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#b08968',
    }
});