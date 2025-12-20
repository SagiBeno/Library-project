import { useEffect, useState } from "react"
import { Container, Box, Typography } from "@mui/material"
import { BorrowsTable } from "../Components/Tables";
import SearchComponent from "../Components/SearchComponent";
import { DeleteBorrowModal } from "../Components/Modals";

import { getAllBorrows } from "../utils"

export default function LibrarianPage({ snackbar, setSnackbar, setIsLoading }) {
    const [borrows, setBorrows] = useState([]);
    const [filteredBorrows, setFilteredBorrows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [selectedData, setSelectedData] = useState([]); 

    useEffect(() => {
        async function fetchBorrows() {
            setIsLoading(true);
            const res = await getAllBorrows();
            if (res.ok) {
                const data = await res.json();
                console.log(data.data[0])
                setBorrows(data.data);
                setFilteredBorrows(data.data)
            } else {
                setSnackbar({
                    open: true,
                    message: 'Error during retrieval!',
                    severity: 'error'
                });
            }

            setIsLoading(false);
        }
        fetchBorrows();
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