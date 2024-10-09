import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button,Table,TableBody,TableCell,TableHead,TableRow,Typography} from "@mui/material";
import axios from "axios";
import eventEmitter from "./eventEmitter";
export default class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    eventEmitter.emit("message", "true");
    axios
      .get("https://fitness-app-backend-6t94.onrender.com/exercises")
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => console.log(`Err: ${err}`));
  }

  deleteExercise(id) {
    console.log(id);
    axios
      .delete(`https://fitness-app-backend-6t94.onrender.com/exercises/${id}`)
      .then(res => alert(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  render() {
    return (
      <React.Fragment>
      <Typography></Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.exercises.map(exercise => {
            return (
              <TableRow>
                <TableCell>{exercise.username}</TableCell>
                <TableCell>{exercise.description}</TableCell>
                <TableCell>{exercise.duration}</TableCell>
                <TableCell>{exercise.date.substring(0, 10)}</TableCell>
                <TableCell>
                  <Link
                    to={"/edit/" + exercise._id}
                    style={{ textDecoration: "none" }}>
                   <Button variant="outlined" style={{ margin: "10px" }}>
                      Edit
                    </Button>
                  </Link>
                  <Button onClick={() => this.deleteExercise(exercise._id)}>
                    Delete
                  </Button>
                  </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </React.Fragment>
    );
  }
}
