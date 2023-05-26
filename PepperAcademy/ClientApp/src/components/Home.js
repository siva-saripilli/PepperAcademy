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
                    <input></input><br></br>
                    <label>Level</label> <br></br>
                    <input></input><br></br>
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
