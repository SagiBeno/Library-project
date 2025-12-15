import { Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import RadioButtons from "../Components/RadioButtons";
import MyTable from "../Components/MyTable";
import supabase from "../supabase-test/supabase";
import { EditModal, DeleteModal } from '../Components/Modals';
import SelectComponent from "../Components/SelectComponent";
import RegisterForm from "../Components/RegisterForm";

export default function AdminPage({ setIsLoading }) {
    const [radioOptions, setRadioOptions] = useState({
        librarian: 'Librarian',
        member: 'Member',
        admin: 'Admin',
        new: 'New user'
    });

    const [selectOptions, setSelectOptions] = useState({
        librarian: 'Librarian',
        member: 'Member',
        admin: 'Admin',
    });

    const [radioSelectedOption, setRadioSelectedOption] = useState('');
    const [selectSelectedOption, setSeletSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [formValues, setFormValues] = useState({
         email: '',
         password: '',
         passwordConfirm: '',
         username: '',
    });

    const handleRadioButtons = (value) => {
        setRadioSelectedOption(value);
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

        if (value === 'worker') {

            // TODO

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

        if (value === 'new') setTableData([]);
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

    const handleSelectOnchange = (e) => {
        setSeletSelectedOption(e.target.value)
    }

    const handleFormChange = (e) => {
        const formElement = e.target.name;
        const value = e.target.value;

        setFormValues({
            ...formValues,
            [formElement]: value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    }


    return (
        <Container className="container">
            <RadioButtons radioOptions={radioOptions} handleRadioButtons={handleRadioButtons} />
            {
                radioSelectedOption == 'new' &&
                <Paper
                    square={false}
                    sx={{
                        textAlign: 'center',
                        padding: '10px',
                        minWidth: '60vw',
                    }}
                    elevation={3}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Create an account
                    </Typography>
                    <SelectComponent handleChange={handleSelectOnchange} selectOptions={selectOptions} selectedOption={selectSelectedOption} />
                    
                    {
                        selectSelectedOption.length > 0 && <RegisterForm formValues={formValues} handleChange={handleFormChange} handleSubmit={handleFormSubmit}/>
                    }
                </Paper>
            }

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