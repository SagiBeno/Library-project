import { useEffect, useState } from "react"
import { Container, Box, Typography } from "@mui/material"
import { BorrowsTable } from "../Components/Tables";
import SearchComponent from "../Components/SearchComponent";
import { DeleteBorrowModal } from "../Components/Modals";

import { getAllBorrows, deleteBorrow } from "../utils"

async function fetchBorrows(setIsLoading, setBorrows, setFilteredBorrows, snackbar, setSnackbar) {
    setIsLoading(true);
    const res = await getAllBorrows();
    if (res.ok) {
        const data = await res.json();
        setBorrows(data.data);
        setFilteredBorrows(data.data)
    } else {
        setSnackbar({
            ...snackbar,
            open: true,
            message: 'Error during retrieval!',
            severity: 'error'
        });
    }

    setIsLoading(false);
}

export default function LibrarianPage({ snackbar, setSnackbar, setIsLoading }) {
    const [borrows, setBorrows] = useState([]);
    const [filteredBorrows, setFilteredBorrows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        fetchBorrows(setIsLoading, setBorrows, setFilteredBorrows, snackbar, setSnackbar);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setFilteredBorrows(borrows);
        } else {
            setFilteredBorrows(borrows.filter((borrow) =>
                borrow.library_project_books.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                borrow.library_project_users.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                borrow.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                borrow.borrow_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                borrow.return_date.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }

    const handleDelete = (e) => {
        const id = +e.currentTarget.value;
        setSelectedData(borrows.filter(borrow => borrow.id === id));
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = (borrow) => {
        const id = borrow[0].id;

        async function fetchDelete() {
            const response = await deleteBorrow(id);
            if (response.ok) {
                setSnackbar({
                    ...snackbar,
                    open: true,
                    message: 'Delete successful!',
                    severity: 'success'
                });
                fetchBorrows(setIsLoading, setBorrows, setFilteredBorrows, snackbar, setSnackbar);
            } else {
                setSnackbar({
                    ...snackbar,
                    open: true,
                    message: 'Delete failed. Please try again!',
                    severity: 'error'
                });
            }
        }

        fetchDelete();
    }

    return (
        <Container className="container">
            <SearchComponent handleChange={handleSearchChange} handleSearch={handleSearch} searchQuery={searchQuery} />

            {
                filteredBorrows.length > 0
                    ?
                    <BorrowsTable handleDelete={handleDelete} data={filteredBorrows} />
                    :
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
                showDeleteModal && <DeleteBorrowModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} data={selectedData} handleDeleteConfirm={handleDeleteConfirm} />
            }


        </Container>
    )
}