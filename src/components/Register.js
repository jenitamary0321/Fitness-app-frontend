import React, { Component } from 'react';
import axios from "axios";
import { Button, TextField, Container } from '@mui/material'; // Ensure this is only imported once

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
      confirmpass: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if(this.state.name === undefined || this.state.name === ""){
      alert("User name field is empty!");
      return;
    }
    if(this.state.name.length < 5 || this.state.name.length > 8){
      alert("name length mismatch!! required 5 to 8 letters");
      return;
    }
    if(this.state.username === undefined || this.state.username === ""){
      alert("User name field is empty!");
      return;
    }
    if(this.state.username.length < 5 || this.state.username.length > 8){
      alert("Username length mismatch!! required 5 to 8 letters");
      return;
    }
    if(this.state.password !== this.state.confirmpass){
      alert("Password input mismatch!");
      return;
    }
    const user = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => alert(res.data));
    this.setState({
      name:"",
      username: "",
      password: "",
      confirmpass:""
    });
  };

  render() {
    return (
     <Container>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
        <TextField
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          label="Name of User"
          required
        />
        <br />
        <br />
        <TextField 
            type="text"
          name="username"
          value={this.state.username}
          onChange={this.onChange}
          label="User name"
          requried
        />
        <br />
        <br />
            <TextField 
            type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          label="Password"
          requried
        />
            <br />
            <br />
            <TextField
         type="password"
          name="confirmpass"
          value={this.state.confirmpass}
          onChange={this.onChange}
          label="Confirm password"
          required
        />
        <br />
            <br />
            <br />
          <Button
            //type="submit"
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
          >
            Register
          </Button>
        </form>
      </Container>
      
    );
  }
}

export default Register;
