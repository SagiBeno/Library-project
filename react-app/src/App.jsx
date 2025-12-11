import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import AdminPage from './Pages/AdminPage'
import ProfilePage from './Pages/ProfilePage'
import './App.css'

function App() {
  const navigate = useNavigate();
  // TODO - Log in
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

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
      </Routes>
    </>
  )
}

export default App
