
import React, { Component } from 'react';
import { Select, Typography, Divider, FormControl,InputLabel, MenuItem, TextField, Button } from '@mui/material'; // Correcting Material UI imports
import axios from 'axios';
import eventEmitter from './eventEmitter';
export default class GoalSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: "",
      date: "2019-01-01T10:30",
      users: []
    };
    
    // Ensure proper binding of 'this' context
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    eventEmitter.emit("message", "true");
    axios.get("http://localhost:5000/users")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username // Select the first username by default
          });
        }
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    axios.post("http://localhost:5000/exercises/add", exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    //  eventEmitter.emit("message", "false");
    window.location = "/exercise"; // Redirect after submission
  }

  render() {
    return (
      <div>
        <Typography variant="h5">Enter Activity Details</Typography>
        <Divider style={{ margin: "10px 10" }} />
         <FormControl  margin="normal">
          <InputLabel>Name</InputLabel> 
           <Select
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            displayEmpty
              label="User Name"
            
            >
          {this.state.users.map((user, index) => (
              <MenuItem key={index} value={user}>{user}</MenuItem>
            ))}
          </Select> 
        </FormControl><br /> 

         <TextField
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          label="Description"
          style={{ width: '300px' }} 
          margin="normal"
        />
        <br />
        <TextField
          name="duration"
          value={this.state.duration}
          onChange={this.onChange}
          label="Duration (minutes)"
          style={{ width: '300px' }} 
          margin="normal"
        />
        <br />
        <TextField
          name="date"
          type="datetime-local"
          value={this.state.date}
          onChange={this.onChange}
          style={{ width: '300px' }} 
          margin="normal"
        />
        <br />
         <Button
              variant="contained"
              color="primary"
              style={{
                margin: "26px 0px",
                backgroundColor: "primary",
                color: "primary"
              }}
              onClick={this.onSubmit}
            >
              Add Excercise
            </Button>
            
      </div>
    );
  }
}
