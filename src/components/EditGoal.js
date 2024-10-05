// import React, { Component } from "react";
// import { useParams } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import {
//   Typography,
//   TextField,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button
// } from "@material-ui/core";
// import axios from "axios";
// import Navbar from "./Navbar";


// export default class EditGoal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       description: "",
//       duration: "",
//       date: "2019-01-01T10:30",
//       users: [],
//       id : useParams()
//     };
//   }
  

//   componentDidMount() {
//     console.log(this.props);
//     axios
//       .get(`http://localhost:5000/exercises/${id}`)
//       .then(res => {
//         this.setState({
//           username: res.data.username,
//           description: res.data.description,
//           duration: res.data.duration,
//           date: res.data.date
//         });
//       })
//       .catch(err => console.log(`Error: ${err}`));

//     axios.get("http://localhost:5000/users").then(res => {
//       if (res.data.length > 0) {
//         this.setState({
//           users: res.data.map(user => user.username)
//         });
//       }
//     });
//   }

//   onChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     const exercise = {
//       username: this.state.username,
//       description: this.state.description,
//       duration: this.state.duration,
//       date: this.state.date
//     };

//     axios
//       .post(
//         `http://localhost:5000/exercises/update/${this.props.match.params.id}`,
//         exercise
//       )
//       .then(res => console.log(res.data));

//     window.location = "/exercise";
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Navbar/>
//         <Typography>Edit Activity Details</Typography>
//         <Divider style={{ margin: "20px 0px" }} />
//         <FormControl>
//           <InputLabel>User</InputLabel>
//           <Select
//             name="username"
//             value={this.state.username}
//             onChange={this.onChange}
//           >
//             {this.state.users.map(user => {
//               return <MenuItem value={user}>{user}</MenuItem>;
//             })}
//           </Select>
//         </FormControl>
//         <br />
//         <TextField
//           name="description"
//           value={this.state.description}
//           onChange={this.onChange}
//           label="Description"
//           margin="normal"
//         />
//         <br />
//         <TextField
//           name="duration"
//           value={this.state.duration}
//           onChange={this.onChange}
//           label="Duration"
//           margin="normal"
//         />
//         <br />
//         <TextField
//           name="date"
//           type="datetime-local"
//           defaultValue={this.state.date}
//           onChange={this.onChange}
//           margin="normal"
//         />
//         <br />
//         <Button
//           variant="contained"
//           color="primary"
//           style={{
//             margin: "20px 0px",
//             backgroundColor: "#6c7b95",
//             color: "white"
//           }}
//           onClick={this.onSubmit}
//         >
//           Update
//         </Button>
//       </React.Fragment>
//     );
//   }
// }

import React, { Component } from "react";
import {
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import axios from "axios";
import { withRouter } from './withRouter'; // Import the new HOC

class EditGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: "",
      date: "2019-01-01T10:30",
      users: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.params; // Access the id from route parameters

    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: res.data.date
        });
      })
      .catch(err => console.log(`Error: ${err}`));

    axios.get("http://localhost:5000/users").then(res => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username)
        });
      }
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.params; // Access id from route parameters

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    axios
      .post(
        `http://localhost:5000/exercises/update/${id}`,
        exercise
      )
      .then(res => console.log(res.data));

    this.props.navigate("/exercise"); // Use navigate to programmatically redirect
  };

  render() {
    return (
      <React.Fragment>
        <Typography>Edit Activity Details</Typography>
        <Divider style={{ margin: "20px 0px" }} />
        <FormControl>
          <InputLabel>User</InputLabel>
          <Select
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          >
            {this.state.users.map(user => {
              return <MenuItem key={user} value={user}>{user}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <br />
        <TextField
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          label="Description"
          margin="normal"
        />
        <br />
        <TextField
          name="duration"
          value={this.state.duration}
          onChange={this.onChange}
          label="Duration"
          margin="normal"
        />
        <br />
        <TextField
          name="date"
          type="datetime-local"
          defaultValue={this.state.date}
          onChange={this.onChange}
          margin="normal"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "20px 0px",
            backgroundColor: "#6c7b95",
            color: "white"
          }}
          onClick={this.onSubmit}
        >
          Update
        </Button>
      </React.Fragment>
    );
  }
}

// Wrap the component with `withRouter` to pass `params` and `navigate`
export default withRouter(EditGoal);
