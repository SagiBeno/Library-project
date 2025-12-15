import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";
import { CssSelect } from "./ComponentsOwnStyle";

export default function SelectComponent({ handleChange, selectOptions, selectedOption }) {
    return (
        <FormControl 
            sx={{
                width: '97%',
                marginTop: '10px'
            }}
        >
            <InputLabel id="type">Type of user</InputLabel>
            <CssSelect
                labelId="Type of user"
                id="select-type"
                value={selectedOption}
                label="Type of user"
                onChange={handleChange}
            >
                {
                    selectOptions &&
                    Object.keys(selectOptions).map((objKey, idx) => (
                        <MenuItem value={objKey} key={idx}>{selectOptions[objKey]}</MenuItem>
                    ))
                }
            </CssSelect>
        </FormControl>
    )
}