import { FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Box } from "@mui/material";
import { useState } from "react";

export default function RadioButtons ( { radioOptions, handleRadioButtons } ) {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
        handleRadioButtons(value);
    }

    return (
        <Box
            sx={{
                textAlign: 'center',
                marginBottom: '20px'
            }}
        >
            <FormControl>
                <FormLabel id="radioButtons">Select an option</FormLabel>
                <RadioGroup
                  name="radioButtons"
                  value={value}
                  onChange={(e) => handleChange(e)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '10px'
                  }}
                >
                    {
                        radioOptions &&
                        Object.keys(radioOptions).map( (objKey, idx) => (
                            <FormControlLabel value={objKey} key={idx} control={<Radio />} label={radioOptions[objKey]} />
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </Box>
    )
}