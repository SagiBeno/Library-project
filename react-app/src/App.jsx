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
import SnackbarComponent from "./Components/SnackbarComponent";

export default function App(props) {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'warning',
  });
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
  const [username, setUsername] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    return savedUsername ? JSON.parse(savedUsername) : '';
  });
  const [isLoading, setIsLoading] = useState(false);

  // Save loggedIn state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  // Save userType state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userType', JSON.stringify(userType));
  }, [userType]);

  // Save userType state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username));
  }, [username]);

  return (
    <>
      <Navbar user={username} userType={userType} setUserType={setUserType} setLoggedIn={setLoggedIn} loggedIn={loggedIn} lendedBooks={lendedBooks} />

      <Routes>
        <Route path='/' element={
          !loggedIn 
            ?
              <LoginPage setIsLoading={setIsLoading} setLoggedIn={setLoggedIn} setUserType={setUserType} setUsername={setUsername} snackbar={snackbar} setSnackbar={setSnackbar} />
            : 
              <SearchPage setIsLoading={setIsLoading} setLendedBooks={setLendedBooks} lendedBooks={lendedBooks} snackbar={snackbar} setSnackbar={setSnackbar} /> } />
        <Route path='/my-books' element={<MyBooksPage setIsLoading={setIsLoading} />} />
        <Route path='/admin' element={<AdminPage setIsLoading={setIsLoading} snackbar={snackbar} setSnackbar={setSnackbar} />} />
        <Route path='/search' element={<SearchPage setIsLoading={setIsLoading} setLendedBooks={setLendedBooks} lendedBooks={lendedBooks} snackbar={snackbar} setSnackbar={setSnackbar} />} />
        <Route path='/register' element={<RegisterPage setIsLoading={setIsLoading} />} />
        <Route path='/lending' element={<BookLendingPage setIsLoading={setIsLoading} lendedBooks={lendedBooks} />} />
      </Routes>
 
      {isLoading && <Spinner />}
      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        vertical={snackbar.vertical}
        horizontal={snackbar.horizontal}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false, message: '' })}
      />

    </>
  )
}
