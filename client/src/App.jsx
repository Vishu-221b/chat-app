import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register.jsx';
import Login from './Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;