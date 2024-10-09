import {useNavigate} from 'react-router-dom';
import eventEmitter from './eventEmitter';

const Logout = () => {
  const navigate  = useNavigate();

  const handleLogout = (() => {
  
    localStorage.removeItem('authToken');  
    eventEmitter.emit("message", "false");
     
    window.location='./login'
  })();    

  
};

export default Logout;
 
