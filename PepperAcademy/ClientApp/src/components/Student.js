import React, { Component } from "react";
import Speech from "./Speech";
import "./Student.css";

export class Student extends Component {
  constructor(props) {
    super(props);
      this.state = {
      questions: [],
      answers: {},

    };
  }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const course = urlParams.get("subject");
        const interest = urlParams.get("interest");
        const age = urlParams.get("age");

    // Fetch questions from API
        fetch(`https://localhost:44427/gpt/quizquestion?course=${course}&level=${age}&theme=${interest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
          .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ questions: data.quiz, loading: false });

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
          });
  }

  handleAnswerChange = (questionId, answer) => {
    this.setState((prevState) => ({
      answers: {
        ...prevState.answers,
        [questionId]: answer,
      },
    }));
  };

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const age = urlParams.get("age");
    const name = urlParams.get("name");
    const subject = urlParams.get("subject");
    const interest = urlParams.get("interest");
    const level = urlParams.get("level");
    const { questions, answers } = this.state;

    return (
      <div className="main">
        <h1>Quiz Home Page</h1>
        <div className="student-card ">
          <h3>Student Information</h3>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Subject:</strong> {subject}
          </p>
          <p>
            <strong>Interest:</strong> {interest}
          </p>
          <p>
            <strong>Level:</strong> {level}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
        </div>
         {questions.length > 0 &&  (
                <div key={questions[0].id} className="card">
                    <div className="card-header">Question {questions[0].id}</div>
            <div className="card-body">
                        <p className="card-question">{questions[0].question}</p>
              <div className="answer">
                <input
                  className="input"
                  type="text"
                  value={answers[questions[0].id]}
                  onChange={(e) =>
                      this.handleAnswerChange(questions[0].id, e.target.value)
                  }
                  placeholder="Enter your answer"
                />
                <div className="submitBtn">
                  <input type="submit" value="Submit"  />
                </div>
              </div>
            </div>
          </div>
        )}
 
        <div className="voice-to-text">
          <p><b>Use voice to answer</b></p>
          <Speech />
        </div>
      </div>
    );
  }
}
