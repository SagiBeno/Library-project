import { Container } from "@mui/material"
import { useState } from "react"
import RadioButtons from "../Components/RadioButtons";
import MyTable from "../Components/MyTable";
import supabase from "../supabase-test/supabase";
import MyModal from '../Components/MyModal'

export default function AdminPage({ setIsLoading }) {
    console.log(typeof setIsLoading)
    const [radioOptions, setRadioOptions] = useState({
        worker: 'Worker',
        member: 'Member',
        admin: 'Admin'
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleRadioButtons = (value) => {
        console.log(value);
        setSelectedOption(value);
        // TODO - Querying relevant data
        if (value === 'member') {
            setIsLoading(true);
            (async () => {
                const members = await supabase
                    .from('library_project_users')
                    .select("*")
                    .eq('isAdmin', false)
                if (members.data.length > 0) setTableData(members.data);
            })()
                .catch(console.warn)
                .finally(() => setIsLoading(false))
        }
    }

    const handleEdit = (e) => {
        const id = +e.currentTarget.value;
        setSelectedData(tableData.filter(user => user.id === id));
        setShowModal(true);
    }

    const handleSave = (res) => {

        setIsLoading(true);

        (async () => {
            const { data, error } = await supabase
                .from('library_project_users')
                .upsert({ username: res.username, email: res.email, password: res.password })
                .select()
                .eq('id', res.id)
        })()
            .catch(console.warn)
            .finally(() => setIsLoading(false))
    }

    const handleDelete = (e) => {
        const value = e.currentTarget.value;
    }

    return (
        <Container className="container">
            <RadioButtons radioOptions={radioOptions} handleRadioButtons={handleRadioButtons} />
            {
                tableData.length > 0 && <MyTable data={tableData} handleEdit={handleEdit} handleDelete={handleDelete} loading={setIsLoading} />
            }

            {
                showModal && <MyModal showModal={showModal} setShowModal={setShowModal} data={selectedData} handleSave={handleSave} />
            }
        </Container>
    )
}