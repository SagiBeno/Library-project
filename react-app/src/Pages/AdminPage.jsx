import { Box, Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import RadioButtons from "../Components/RadioButtons";
import MyTable from "../Components/MyTable";
import supabase from "../supabase-test/supabase";
import { EditModal, DeleteModal } from '../Components/Modals';
import SelectComponent from "../Components/SelectComponent";
import RegisterForm from "../Components/RegisterForm";
import SearchComponent from "../Components/SearchComponent";
import { dataRetrievalForAdmin } from "../utils";
import SnackbarComponent from "../Components/SnackbarComponent";

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
    const [selectSelectedOption, setSelectSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const [snackbar, setSnackbar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
        severity: 'warning',
    });

    const handleRadioButtons = async (value) => {

        setRadioSelectedOption(value);

        if (value === 'member' || value === 'librarian' || value === 'admin') {
            setIsLoading(true);
            await dataRetrievalForAdmin(value)
                .then(async (res) => {
                    const parsedRes = await JSON.parse(res);

                    if (parsedRes?.data && parsedRes.data.length > 0) {
                        setTableData(parsedRes.data);
                        setFilteredTableData(parsedRes.data);
                        setSnackbar({
                            ...snackbar,
                            open: true,
                            message: 'The data query was successful!',
                            severity: 'success',
                        });
                    } else {
                        setTableData([]);
                        setFilteredTableData([]);
                        setSnackbar({
                            ...snackbar,
                            open: true,
                            message: 'No data found!',
                            severity: 'warning',
                        });

                    }
                })
                .catch( (err) => {
                    console.warn(err);

                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Error during queries!',
                        severity: 'error',
                    });
                })
                .finally(() => setIsLoading(false))
        }

        if (value === 'new') {
            setTableData([]);
            setFilteredTableData([]);
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

    const handleSelectOnchange = (e) => {
        setSelectSelectedOption(e.target.value)
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setFilteredTableData(tableData);
        } else {
            setFilteredTableData(tableData.filter((user) =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }

    return (
        <Container className="container">
            <RadioButtons radioOptions={radioOptions} handleRadioButtons={handleRadioButtons} />
            {
                (radioSelectedOption !== '' && radioSelectedOption !== 'new') && <SearchComponent handleChange={handleSearchChange} handleSearch={handleSearch} searchQuery={searchQuery} />
            }

            {
                radioSelectedOption === 'new' &&
                <Paper
                    square={false}
                    sx={{
                        textAlign: 'center',
                        padding: '20px',
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
                        selectSelectedOption.length > 0 && <RegisterForm formValues={formValues} handleChange={handleFormChange} handleSubmit={handleFormSubmit} />
                    }
                </Paper>
            }

            {
                filteredTableData.length > 0 && radioSelectedOption !== 'new'

                    ?

                    <Box
                        sx={{
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}
                    >
                        <MyTable data={filteredTableData} handleEdit={handleEdit} handleDelete={handleDelete} loading={setIsLoading} />
                    </Box>

                    :
                    radioSelectedOption !== 'new' &&

                    <Box
                        sx={{
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}
                    >
                        <Typography variant="h6" align="center">
                            No data to avaliable.
                        </Typography>
                    </Box>
            }

            {
                showEditModal && <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} data={selectedData} handleSave={handleSave} />
            }

            {
                showDeleteModal && <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} data={selectedData} handleDeleteConfirm={handleDeleteConfirm} />
            }

            <SnackbarComponent
                open={snackbar.open}
                message={snackbar.message}
                vertical={snackbar.vertical}
                horizontal={snackbar.horizontal}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false, message: '' })}
            />

        </Container>
    )
}