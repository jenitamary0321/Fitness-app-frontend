import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

class NutritionTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

    static contextType = AuthContext;

  onSubmit = e => {
    e.preventDefault();
    this.state.visibleField = true;
    const user = {
     userid: this.state.userid,
      meal: this.state.meal,
      calories: this.state.calories
    };
    axios
      .post("https://fitness-app-backend-6t94.onrender.com/nutrition/add", user)
      .then(res => {
        console.log("Status is : " + res.data.status);
        if(res.data.status === "true"){
          window.location = "/exercises";
        }else if(res.data.status === "false"){
          alert("Invalid password");
        }else if(res.data.status === "Invalid User"){
          alert("User doesn't exist!!");
        }
      });
    this.setState({
      userid: "",
      meal: "",
      calories:""
    }); 
  };

  render() {
    return (
      <div>
        <h2>Track Your Nutrition</h2>
        {this.state.message && <p>{this.state.message}</p>}
        <Formik
          initialValues={{ Userid: '', meal: '', calories: '' }}
          validationSchema={this.nutritionSchema}
          onSubmit={this.handleNutritionTracking}
        >
          {({ isSubmitting }) => (
            <Form>
                <div>
                <label htmlFor="User id">User id</label>
                <Field name="userid" type="text" />
                <ErrorMessage name="User id" component="div" className="error" />
              </div>
              <div>
                <label htmlFor="meal">Meal</label>
                <Field name="meal" type="text" />
                <ErrorMessage name="meal" component="div" className="error" />
              </div>
              <div>
                <label htmlFor="calories">Calories</label>
                <Field name="calories" type="number" />
                <ErrorMessage name="calories" component="div" className="error" />
              </div>

              <button onClick={this.onSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Logging...' : 'Log Nutrition'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default NutritionTracker;
