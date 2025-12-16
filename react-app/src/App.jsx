import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import AdminPage from './Pages/AdminPage'
import SearchPage from './Pages/SearchPage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Spinner from './Components/Spinner'
import supabase from "./supabase-test/supabase";
import { Container } from "@mui/material"
import './App.css'

export default function App(props) {
  const navigate = useNavigate();
  // TODO - Log in
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    return savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedIsAdmin = localStorage.getItem('isAdmin');
    return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Save loggedIn state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  // Save isAdmin state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);

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
        <Route path='/login' element={<LoginPage setIsLoading={setIsLoading} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
      </Routes>

      {isLoading && <Spinner />}


      {JSON.stringify(users)}
    </>
  )
}
