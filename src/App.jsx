// src/App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './Pages/Dashboard'
import Navbar from './components/navbar'

function App() {
  const isAuthenticated = !!localStorage.getItem('token')

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
