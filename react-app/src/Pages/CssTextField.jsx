import { TextField } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';

export const LoginTextField = styled(TextField)({
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
            borderColor:'#b08968',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#b08968',
        },
    },
});

export const SearchTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'white',
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
        
        "& .MuiFormLabel-root": {
            color: "white"
        }
    });