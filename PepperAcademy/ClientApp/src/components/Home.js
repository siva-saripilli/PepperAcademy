import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div className="main">
            <h1>Hello, folks!</h1>
            <p>Welcome to Pepper Academy</p>
            <div className="form-container">
                    <form>
                    <label>Student</label><br></br>
                    <input></input><br></br>
                    <label>Course</label><br></br>
                    <select name="course" id="course">
                        <option value="">Select Course</option>
                        <option value="Maths">Maths</option>
                        <option value="English">English</option>
                        <option value="Physics">Physics</option>
                    </select>
                    <br></br>
                    <label>Level</label> <br></br>
                    <select name="level" id="level">
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <br></br>
                    <label>Interest</label><br></br>
                    <input></input><br></br>
                </form>
                <div className="submitBtn">
                    <input type="submit" value="Submit" />
                </div>
                
            </div>
        </div>
      ); 

  }
}
