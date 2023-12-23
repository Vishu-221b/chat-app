import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage.jsx';
import Chatpage from './Pages/Chatpage.jsx';
import "./App.css";
import axios from "axios";
axios.defaults.baseURL = "https://hehechat.onrender.com";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage/>}/>
      </Routes>
    </div>
  );
}

export default App;