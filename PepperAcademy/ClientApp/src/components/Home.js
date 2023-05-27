import React, { useState, Component } from 'react';
import './Home.css';
import Loader from './Loader';
import './Loader.css';

export class Home extends Component {
    static displayName = Home.name;

    state = {
        studentName: '',
        course: '',
        level: '',
        interest: '',
        formError: false,
        response: '',
        loading: false, // Define 'loading' in the component state
    };

    handleSubmit = (event) => {
        event.preventDefault();

        // Basic form validation
        const { studentName, course, level, interest } = this.state;
        if (studentName.trim() === '' || course === '' || level === '' || interest.trim() === '') {
            this.setState({ formError: true });
        } else {
            // Form is valid, make API call or perform other actions
            this.setState({ formError: false, loading: true });

            // Prepare the data for the API call
            const formData = {
                studentName,
                course,
                level,
                interest,
            };

            // Make the API call
            fetch(`https://localhost:44427/gpt/learningpath?studentName=${studentName}&course=${course}&level=${level}&theme=${interest}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the API response
                    console.log(data);
                    this.setState({ response: data, loading: false });

                    // Reset the form after successful submission
                    this.setState({
                        studentName: '',
                        course: '',
                        level: '',
                        interest: '',
                    });
                })
                .catch(error => {
                    // Handle the API error
                    console.error(error);
                    this.setState({ loading: false });
                });
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    showLoader = () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 5000);
    };

    render() {
        const { studentName, course, level, interest, formError, response, loading } = this.state;

        return (
            <div className="main">
                <h1>Hello, folks!</h1>
                <p>Welcome to Pepper's Academy</p>
                <div className="form-container" className={loading ? 'hide-when-loading' : ''}>
                    <form target="_blank" onSubmit={this.handleSubmit}>
                        <label>Student</label><br></br>
                        <input type="text" id="studentName" value={studentName} onChange={this.handleChange} ></input><br></br>
                        <label>Course</label><br></br>
                        <select id="course" value={course} onChange={this.handleChange}>
                            <option value="">Select Course</option>
                            <option value="Maths">Maths</option>
                            <option value="English">English</option>
                            <option value="Physics">Physics</option>
                        </select>
                        <br></br>
                        <label>Level</label> <br></br>
                        <select id="level" value={level} onChange={this.handleChange}>
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <br></br>
                        <label>Interest</label><br></br>
                        <input type="text" id="interest" value={interest} onChange={this.handleChange}></input><br></br>
                        <div className="submitBtn">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                    {formError && <p className="error-message">Please fill in all the fields.</p>}
                </div>

                {/* Button to trigger the loader */}
                <button onClick={this.showLoader}>Show Loader</button>

                {/* Display the loader when 'loading' is true */}
                {loading && <Loader />}

                <p>Customised Learning Plan<br />{response.learningPlan}</p>
            </div>
        );
    }
}
