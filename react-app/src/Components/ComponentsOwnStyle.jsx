import { Radio, Select, TextField, Badge } from "@mui/material";
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

export const CustomRadio = styled(Radio)({
    color: '#ddb892',
    '&.Mui-checked': {
        color: '#b08968',
    },
});

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));