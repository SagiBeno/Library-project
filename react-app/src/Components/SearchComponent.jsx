import { CustomTextField } from "./ComponentsOwnStyle";
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from "@mui/material";

export default function SearchComponent( { handleChange, handleSearch, searchQuery } ) {
    return (
        <Box
            sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '10px',
            }}
        >
            <CustomTextField
                variant="outlined"
                label='Search'
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleChange(e)}
            />
            <IconButton onClick={() => handleSearch()}>
                <SearchIcon />
            </IconButton>
        </Box>
    )
}