import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import MyBooksPage from './Pages/MyBooksPage'
import './App.css'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/my-books' element={<MyBooksPage />}/>
      </Routes>
    </>
  )
}

export default App
