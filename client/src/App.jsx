import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage.jsx';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;