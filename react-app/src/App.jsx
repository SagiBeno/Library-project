import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import AdminPage from './Pages/AdminPage'
import SearchPage from './Pages/SearchPage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import Spinner from './Components/Spinner'
import supabase from "./supabase-test/supabase";
import { Container } from "@mui/material";
import './App.css';
import BookLendingPage from './Pages/BookLendingPage';

export default function App(props) {
  const navigate = useNavigate();
  const [lendedBooks, setLendedBooks] = useState([]);
  // TODO - Log in
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    return savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
  });
  const [userType, setUserType] = useState(() => {
    const savedUserType = localStorage.getItem('userType');
    return savedUserType ? JSON.parse(savedUserType) : 'member';
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Save loggedIn state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  // Save userType state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userType', JSON.stringify(userType));
  }, [userType]);

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
      <Navbar userType={userType} setUserType={setUserType} setLoggedIn={setLoggedIn} loggedIn={loggedIn} lendedBooks={lendedBooks} />

      <Routes>
        <Route path='/' element={<LoginPage setIsLoading={setIsLoading} setLoggedIn={setLoggedIn} setUserType={setUserType} />} />
        <Route path='/my-books' element={<MyBooksPage setIsLoading={setIsLoading} />} />
        <Route path='/admin' element={<AdminPage setIsLoading={setIsLoading} />} />
        <Route path='/search' element={<SearchPage setIsLoading={setIsLoading} setLendedBooks={setLendedBooks} lendedBooks={lendedBooks} />} />
        <Route path='/login' element={<LoginPage setIsLoading={setIsLoading} setLoggedIn={setLoggedIn} setUserType={setUserType} />} />
        <Route path='/register' element={<RegisterPage setIsLoading={setIsLoading} />} />
        <Route path='/lending' element={<BookLendingPage setIsLoading={setIsLoading} lendedBooks={lendedBooks} />} />
      </Routes>

      {isLoading && <Spinner />}


      {JSON.stringify(users)}
    </>
  )
}
