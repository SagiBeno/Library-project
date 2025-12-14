import { Container } from "@mui/material"
import { useState } from "react"
import RadioButtons from "../Components/RadioButtons";
import MyTable from "../Components/MyTable";
import supabase from "../supabase-test/supabase";
import { EditModal, DeleteModal } from '../Components/MyModal'

export default function AdminPage({ setIsLoading }) {
    const [radioOptions, setRadioOptions] = useState({
        worker: 'Worker',
        member: 'Member',
        admin: 'Admin'
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState();

    const handleRadioButtons = (value) => {
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

        if (value === 'admin') {
            setIsLoading(true);
            (async () => {
                const members = await supabase
                    .from('library_project_users')
                    .select("*")
                    .eq('isAdmin', true)
                if (members.data.length > 0) setTableData(members.data);
            })()
                .catch(console.warn)
                .finally(() => setIsLoading(false))
        }
    }

    const handleEdit = (e) => {
        const id = +e.currentTarget.value;
        setSelectedData(tableData.filter(user => user.id === id));
        setShowEditModal(true);
    }

    const handleSave = (res) => {

        setIsLoading(true);
        /*
        (async () => {
            const { data, error } = await supabase
                .from('library_project_users')
                .update({ username: res.username, email: res.email, password: res.password })
                .eq('id', res.id)
        })()
            .catch(console.warn)
            .finally(() => {
                setIsLoading(false);
                handleRadioButtons(selectedOption);
            })*/
    }

    const handleDelete = (e) => {
        const id = +e.currentTarget.value;
        setSelectedData(tableData.filter(user => user.id === id));
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = (res) => {
        /*
        (async () => {
            const { data, error } = await supabase
                .from('library_project_users')
                .update({ username: res[0].username, email: res[0].email, password: res[0].password })
                .eq('id', res[0].id)
        })()
            .catch(console.warn)
            .finally(() => {
                setIsLoading(false);
                handleRadioButtons(selectedOption);
            })*/
    }

    return (
        <Container className="container">
            <RadioButtons radioOptions={radioOptions} handleRadioButtons={handleRadioButtons} />
            {
                tableData.length > 0 && <MyTable data={tableData} handleEdit={handleEdit} handleDelete={handleDelete} loading={setIsLoading} />
            }

            {
                showEditModal && <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} data={selectedData} handleSave={handleSave} />
            }

            {
                showDeleteModal && <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} data={selectedData} handleDeleteConfirm={handleDeleteConfirm} />
            }

        </Container>
    )
}