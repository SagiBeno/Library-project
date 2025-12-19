import { Box, Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import RadioButtons from "../Components/RadioButtons";
import { AdminTable } from "../Components/Tables";
import supabase from "../supabase-test/supabase";
import { EditModal, DeleteModal } from '../Components/Modals';
import SelectComponent from "../Components/SelectComponent";
import RegisterForm from "../Components/RegisterForm";
import SearchComponent from "../Components/SearchComponent";
import { dataRetrievalForAdmin, registerUser, updateUser, deleteUser } from "../utils";
import SnackbarComponent from "../Components/SnackbarComponent";

export default function AdminPage({ setIsLoading, snackbar, setSnackbar }) {
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
                .catch((err) => {
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

    const handleSave = async (res) => {
        setIsLoading(true);

        let response;
        if (res.password != tableData.find(user => user.id === res.id).password) {
            response = await updateUser(res.id, res.username, res.password, res.email)
        }
        else {
            response = await updateUser(res.id, res.username, undefined, res.email)
        }

        setIsLoading(false);

        if (!response.ok) {
            setSnackbar({
                ...snackbar,
                open: true,
                message: 'Update failed. Please try again!',
                severity: 'error',
            });
        }
        else {
            handleRadioButtons(radioSelectedOption)
            setSnackbar({
                ...snackbar,
                open: true,
                message: 'Update successful!',
                severity: 'success',
            });
        }

    }

    const handleDelete = (e) => {
        const id = +e.currentTarget.value;
        setSelectedData(tableData.filter(user => user.id === id));
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = async (res) => {
        setIsLoading(true);

        const response = await deleteUser(res[0].id);

        console.log(response);

        setIsLoading(false);

        if (!response.ok) {
            setSnackbar({
                ...snackbar,
                open: true,
                message: 'Delete failed. Please try again!',
                severity: 'error',
            });
        }
        else {
            handleRadioButtons(radioSelectedOption)
            setSnackbar({
                ...snackbar,
                open: true,
                message: 'Delete successful!',
                severity: 'success',
            });
        }
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

        registerUser(formValues.username, formValues.password, formValues.email, selectSelectedOption)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Registration failed! Please try again!',
                        severity: 'warning',
                    });
                }
                else {
                    setSnackbar({
                        ...snackbar,
                        open: true,
                        message: 'Registration successful! You can now log in.',
                        severity: 'success',
                    });
                    handleRadioButtons(selectSelectedOption);
                }
            })
            .catch((error) => {
                setSnackbar({
                    ...snackbar,
                    open: true,
                    message: 'An error occurred during registration. Please try again!',
                    severity: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                        <AdminTable data={filteredTableData} handleEdit={handleEdit} handleDelete={handleDelete} loading={setIsLoading} />
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

        </Container>
    )
}