import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

class WorkoutTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }
    static contextType = AuthContext;

   
  workoutSchema = Yup.object().shape({
    type: Yup.string().required('Workout type is required'),
    duration: Yup.number()
      .required('Duration is required')
      .positive('Duration must be a positive number'),
    intensity: Yup.string().required('Intensity is required'),
    caloriesBurned: Yup.number()
      .required('Calories burned are required')
      .positive('Calories must be a positive number'),
  });

  // Function to handle form submission
  handleWorkoutTracking = async (values, { resetForm }) => {
    const { user } = this.context; // Access user from AuthContext
    try {
      await axios.post('https://fitness-app-backend-6t94.onrender.com/workouts', values, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      this.setState({ message: 'Workout logged successfully' });
      resetForm(); // Reset form fields after successful submission
    } catch (err) {
      this.setState({ message: 'Error in logging workout' });
    }
  };

  render() {
    return (
      <div>
        <h2>Track Your Workout</h2>
        {this.state.message && <p>{this.state.message}</p>}

        <Formik
          initialValues={{ type: '', duration: '', intensity: '', caloriesBurned: '' }}
          validationSchema={this.workoutSchema}
          onSubmit={this.handleWorkoutTracking}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="type">Type of Workout</label>
                <Field name="type" type="text" />
                <ErrorMessage name="type" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="duration">Duration (in minutes)</label>
                <Field name="duration" type="number" />
                <ErrorMessage name="duration" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="intensity">Intensity</label>
                <Field name="intensity" type="text" />
                <ErrorMessage name="intensity" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="caloriesBurned">Calories Burned</label>
                <Field name="caloriesBurned" type="number" />
                <ErrorMessage name="caloriesBurned" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging...' : 'Log Workout'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default WorkoutTracker;
