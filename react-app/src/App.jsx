import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import AdminPage from './Pages/AdminPage'
import ProfilePage from './Pages/ProfilePage'
import Container from '@mui/material/Container'
import RegisterPage from './Pages/RegisterPage'
import './App.css'

function App() {
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
      setUsers(felhasznalok.data);
    })().catch(console.warn);
  }, []);

  return (
    <>
      {
        loggedIn && <Navbar isAdmin={isAdmin} setLoggedIn={setLoggedIn} />
      } 
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/my-books' element={<MyBooksPage />}/>
        <Route path='/admin' element={<AdminPage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
      {JSON.stringify(users)}
    </>
  )
}
