import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";

export default function SelectComponent({ handleChange, selectOptions, selectedOption }) {
    return (
        <FormControl fullWidth>
            <InputLabel id="type">Type</InputLabel>
            <Select
                labelId="type"
                id="select-type"
                value={selectedOption}
                label="Type"
                onChange={handleChange}
            >
                {
                    selectOptions &&
                    Object.keys(selectOptions).map((objKey, idx) => (
                        <MenuItem value={objKey} key={idx}>{selectOptions[objKey]}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}