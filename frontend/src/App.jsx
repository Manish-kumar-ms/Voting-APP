import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import { useContext } from 'react';
import { UserDataContext } from './context/UserContext';



const App = () => {
  const { userData, setUserData, loading } = useContext(UserDataContext);

   if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={userData ? <Navigate to="/home" /> : <Login />} />
    </Routes>
  )
}

export default App