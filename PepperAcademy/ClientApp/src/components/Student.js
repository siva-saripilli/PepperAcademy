import React, { Component } from 'react';
import Speech from './Speech';
import './Student.css';

export class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [{id:"1", questions:""}],
            answers: {},
        };
    }

    componentDidMount() {
        // Fetch questions from API
        fetch('https://api.example.com/questions') // Replace with your API endpoint
            .then((response) => response.json({}))
            .then((data) => {
                const answers = {};
                data.forEach((question) => {
                    answers[question.id] = '';
                });
                this.setState({ questions: data, answers: answers });
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
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
        const age = urlParams.get('age');
        const name = urlParams.get('name');
        const subject = urlParams.get('subject');
        const interest = urlParams.get('interest');
        const level = urlParams.get('level');
        const { questions, answers } = this.state;

        return (
            <div className="main">
                <h1>Quiz Home Page</h1>
                <div className="student-card ">
                    <h3>Student Information</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                    <p><strong>Interest:</strong> {interest}</p>
                    <p><strong>Level:</strong> {level}</p>
                    <p><strong>Age:</strong> {age}</p>
                </div>
                {questions.map((question) => (
                    <div key={question.id} className="card" >
                        <div className="card-header">Question {question.id}</div>
                        <div className="card-body">
                            <p className="card-question">{question.question}</p>
                            <div className="answer">
                                <input
                                    type="text"
                                    value={answers[question.id]}
                                    onChange={(e) => this.handleAnswerChange(question.id, e.target.value)}
                                    placeholder="Enter your answer"
                                />
                                 <div className="submitBtn">
                                    <input type="submit" value="Submit" />
                                </div>
                            </div>

                        </div>

                    </div>


                ))};
                <div className="voice-to-text">
                    <h1>Voice to Text</h1>
                    <Speech />
                </div>
            </div>
        );
    }
}
