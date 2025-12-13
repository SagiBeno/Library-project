import { Container } from "@mui/material"
import { useState } from "react"
import RadioButtons from "../Components/RadioButtons";
import Table from "../Components/Table";

export default function AdminPage(props) {
    const [radioOptions, setRadioOptions] = useState({
        worker: 'Worker',
        member: 'Member',
        admin: 'Admin'
    });

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioButtons = (value) => {
        console.log(value);
        setSelectedOption(value);
        // TODO - Querying relevant data
    }

    return (
        <Container className="container">
            <RadioButtons radioOptions={radioOptions} handleRadioButtons={handleRadioButtons}/>
        </Container>
    )
}