// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import GoalSetting from './components/GoalSetting'; // Ensure this file exists
import EditGoal from './components/EditGoal';   // Ensure this file exists
import GoalList from './components/GoalList';
import './App.css';
import Logout from './components/Logout';
function App() {
  return (
    <div>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exercise" element={<GoalList />} />
        <Route path="/edit/:id" element={<EditGoal />} />
        <Route path="/create" element={<GoalSetting />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
         </Router>
        
         </div>
         
  );
}
export default App;
