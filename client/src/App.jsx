import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register.jsx';
import Login from './Login.jsx';
import { AuthProvider } from './AuthContext.jsx';
import Profile from './Profile.jsx';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;