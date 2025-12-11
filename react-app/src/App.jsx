import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import AdminPage from './Pages/AdminPage'
import ProfilePage from './Pages/ProfilePage'
import RegisterPage from './Pages/RegisterPage'
import supabase from "./supabase-test/supabase";
import { Container } from "@mui/material"
import './App.css'

export default function App(props) {
  const navigate = useNavigate();
  // TODO - Log in
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [users, setUsers] = useState([]);

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
        <Route path='/' element={<HomePage />} />
        <Route path='/my-books' element={<MyBooksPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>

      {JSON.stringify(users)}
    </>
  )
}
