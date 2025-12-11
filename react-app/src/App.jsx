import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import './App.css'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
    </>
  )
}

export default App
