import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import AdminPage from './Pages/AdminPage'
import SearchPage from './Pages/SearchPage'
import RegisterPage from './Pages/RegisterPage'
import Spinner from './Components/Spinner'
import supabase from "./supabase-test/supabase";
import { Container } from "@mui/material"
import './App.css'

export default function App(props) {
  const navigate = useNavigate();
  // TODO - Log in
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const felhasznalok = await supabase
        .from("library_project_junction")
        .select("*")
      console.log(felhasznalok)
      setUsers(felhasznalok.data);
    })().catch(console.warn);
  }, []);

  return (
    <>
      <Navbar isAdmin={isAdmin} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />

      <Routes>
        <Route path='/' element={<HomePage setIsLoading={setIsLoading} />} />
        <Route path='/my-books' element={<MyBooksPage setIsLoading={setIsLoading} />} />
        <Route path='/admin' element={<AdminPage setIsLoading={setIsLoading} />} />
        <Route path='/search' element={<SearchPage setIsLoading={setIsLoading} />} />
        <Route path='/register' element={<RegisterPage setIsLoading={setIsLoading} />} />
      </Routes>

      {isLoading && <Spinner />}


      {JSON.stringify(users)}
    </>
  )
}
