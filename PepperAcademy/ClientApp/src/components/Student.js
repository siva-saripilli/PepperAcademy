import React, { Component } from "react";
import Speech from "./Speech";
import "./Student.css";

export class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: {},
      praise: "",
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get("subject");
    const interest = urlParams.get("interest");
    const age = urlParams.get("age");

    // Fetch questions from API
    fetch(
      `https://localhost:44427/gpt/quizquestion?course=${course}&level=${age}&theme=${interest}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.quiz === null) {
          // Handle the case when quiz is null
          console.log("Quiz is null");
          this.setState({ loading: false });
        } else {
          // Update the state with the received data
          this.setState({ questions: data.quiz, loading: false });
        }

        // Reset the form after successful submission
        this.setState({
          studentName: "",
          course: "",
          level: "",
          interest: "",
        });
      })
      .catch((error) => {
        // Handle the API error
        console.error(error);
      });
  }

  handleFormSubmit = () => {
    const { questions, answers } = this.state;
    const { question, id } = questions[0];
    const studentAnswer = answers && answers[id] ? answers[id] : "";
    const urlParams = new URLSearchParams(window.location.search);
    const interest = urlParams.get("interest");
    console.log(answers);
    console.log(id);

    // Make your API call here with the question and student answer
    // Example:
    fetch(
      `https://localhost:44427/gpt/quizanswer?question=${question}&studentAnswer=${studentAnswer}&theme=${interest}&isLastQuestion=${true}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        console.log(data);

        this.setState({ praise: data.answer });
      })
      .catch((error) => {
        // Handle the API error
        console.error(error);
      });
  };

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
    const { questions, answers, praise } = this.state;

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
        {questions.length > 0 && (
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
                  <input type="submit" value="Submit" onClick=
                  {this.handleFormSubmit} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="voice-to-text">
          <p>
            <b>Use voice to answer</b>
          </p>
          <Speech />
        </div>
            <div className="praise-card" dangerouslySetInnerHTML={{ __html: this.state.praise }}></div>
      </div>
    );
  }
}
