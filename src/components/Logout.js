// Logout.js
import React from 'react';
import {useNavigate} from 'react-router-dom';
import eventEmitter from './eventEmitter';

const Logout = () => {
  const navigate  = useNavigate();

  const handleLogout = (() => {
    // Clear localStorage or sessionStorage
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');
    eventEmitter.emit("message", "false");
    // Redirect to the login page
    //navigate('/login');
    window.location = '/login';
  })();    

  // return (
  //   <div>
  //     <button onClick={handleLogout}>Logout</button>
  //   </div>
  // );
};

export default Logout;
