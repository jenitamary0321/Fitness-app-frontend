import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import eventEmitter from './eventEmitter'; // Import the event emitter

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    axios.post('https://fitness-app-backend-6t94.onrender.com/users/login', user)
      .then((res) => {
        console.log('Status is: ' + res.data.status);
        if (res.data.status === 'true') {
          // Emit the message to Navbar
          eventEmitter.emit('message', 'true');
          // Navigate to the exercise page
          alert('Login Successfully!');
          navigate('/exercise');
        } else if (res.data.status === 'false') {
          alert('Invalid password');
        } else if (res.data.status === 'Invalid User') {
          alert('User doesn\'t exist!!');
        }
      })
      .catch((error) => {
        console.error('Login request error!', error);
      });

    setUsername('');
    setPassword('');
  };

  return (
    <React.Fragment>
      <br />
      <h2>Login</h2>
      <TextField
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="outlined"
        margin="normal"
      />
      <br />
      <TextField
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        
      />
      <br />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Login
      </Button>
      
    </React.Fragment>
  );
};
export default Login;
