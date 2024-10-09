import { useEffect } from 'react';
import eventEmitter from './eventEmitter';

const Logout = () => {
  useEffect(() => {
  localStorage.removeItem('authToken');
   eventEmitter.emit("message", "false");
    window.location.href = './login';
  }, []);  
  return null;  
};

export default Logout;
