import { useEffect, useState } from "react"
import { Container } from "@mui/material"

import { getAllBorrows } from "../utils"

export default function LibrarianPage() {
    const [borrows, setBorrows] = useState([]);

    useEffect(() => {
        async function fetchBorrows() {
            const res = await getAllBorrows();
            if (res.ok) {
                const data = await res.json();
                setBorrows(data);
            } else {
                console.error("Failed to fetch all borrows");
            }
        }
        fetchBorrows();
    }, []);

    return (
        <Container className="container">
            {JSON.stringify(borrows)}
        </Container>
    )
}