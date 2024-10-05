// import React, { Component } from "react";
// import { TextField, Button } from "@mui/material";  
// import axios from "axios";
// import { EventEmitter } from "events";

// const myEmitter = new EventEmitter();

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       password: "",
//     };
//   }

//   onChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   onSubmit = (e) => {
//     e.preventDefault(); // Prevent form submission
//     const user = {
//       username: this.state.username,
//       password: this.state.password,
//     };

//     axios
//       .post("http://localhost:5000/users/login", user)
//       .then((res) => {
//         console.log("Status is : " + res.data.status);
//         if (res.data.status === "true") {
//           window.location = "/exercise";
//           // EventEmitter.emit('message', 'true');

//         } else if (res.data.status === "false") {
//           alert("Invalid password");
//         } else if (res.data.status === "Invalid User") {
//           alert("User doesn't exist!!");
//         }
//       })
//       .catch((error) => {
//         console.error("There was an error with the login request!", error);
//       });

//     // Reset state after submission
//     this.setState({
//       username: "",
//       password: "",
//     });
//   };

//    render() {
//      return (
//       <React.Fragment>
//         <br />
//         <h2>Login Card</h2>
        
//         <TextField
//              type="text"
//               name="username"
//               value={this.state.username}
//               onChange={this.onChange}
//               label="Username"
//               variant="outlined"
//             margin="normal"
//             />
//             <br />
//             <br />
//             <TextField
//           type="password"
//           name="password"
//           value={this.state.password}
//           onChange={this.onChange}
//           label="Password"
          
//           requried
//         />
//             <br />
            
//             <Button
//               variant="contained"
//               color="primary"
//               style={{
//                 margin: "26px 0px",
//                 backgroundColor: "primary",
//                 color: "primary"
//               }}
//               onClick={this.onSubmit}
//             >
//               Login
//             </Button>
            
//              </React.Fragment>
             
//         );
//       }
// }

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

    axios.post('http://localhost:5000/users/login', user)
      .then((res) => {
        console.log('Status is: ' + res.data.status);
        if (res.data.status === 'true') {
          // Emit the message to Navbar
          eventEmitter.emit('message', 'true');
          // Navigate to the exercise page
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
