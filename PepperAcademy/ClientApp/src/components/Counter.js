import React, { Component } from 'react';
import './Counter.css'
export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

    render() {
        const students = [
            { "name": "John Doe", "subject": "Math", "level": "Beginner", "interest": "Star Wars", "age": 10, "questions_answered": 10, "questions_correct": 8, "questions_incorrect": 2, "percentage_correct": 80 },
            { "name": "Jane Smith", "subject": "Science", "level": "Intermediate", "interest": "Cars", "age": 8, "questions_answered": 15, "questions_correct": 12, "questions_incorrect": 3, "percentage_correct": 80 },
            { "name": "David Johnson", "subject": "English", "level": "Advanced", "interest": "Flowers", "age": 6, "questions_answered": 8, "questions_correct": 6, "questions_incorrect": 2, "percentage_correct": 75 },
            { "name": "Sarah Thompson", "subject": "History", "level": "Beginner", "interest": "Space exploration", "age": 12, "questions_answered": 10, "questions_correct": 7, "questions_incorrect": 3, "percentage_correct": 70 },
            { "name": "Michael Rodriguez", "subject": "Spanish", "level": "Intermediate", "interest": "Soccer", "age": 14, "questions_answered": 12, "questions_correct": 10, "questions_incorrect": 2, "percentage_correct": 83.3 },
            { "name": "Emily Chen", "subject": "Biology", "level": "Intermediate", "interest": "Animals", "age": 16, "questions_answered": 18, "questions_correct": 15, "questions_incorrect": 3, "percentage_correct": 83.3 },
            { "name": "Daniel Wilson", "subject": "Physics", "level": "Advanced", "interest": "Robotics", "age": 17, "questions_answered": 20, "questions_correct": 18, "questions_incorrect": 2, "percentage_correct": 90 },
            { "name": "Sophia Lee", "subject": "Chemistry", "level": "Advanced", "interest": "Music", "age": 15, "questions_answered": 16, "questions_correct": 14, "questions_incorrect": 2, "percentage_correct": 87.5 },
            { "name": "Olivia Brown", "subject": "Geography", "level": "Intermediate", "interest": "Travel", "age": 13, "questions_answered": 14, "questions_correct": 12, "questions_incorrect": 2, "percentage_correct": 85.7 },
            { "name": "Thomas Wilson", "subject": "Computer Science", "level": "Advanced", "interest": "Coding", "age": 18, "questions_answered": 22, "questions_correct": 21, "questions_incorrect": 1, "percentage_correct": 95.5 }
        ];

        return (

          <div>
                <h1>Student Monitoring</h1>
                <table className="student-table">
                  <thead>
                      <tr>
                            <th>Name</th><th>Subject</th><th>Level</th><th>Interest</th><th>Age</th><th>Questions Answered</th><th>Questions Correct</th><th>Questions Incorrect</th><th>Percentage Correct</th><th>View</th>
                      </tr>
                  </thead>
                  <tbody>
                      {students.map((student, index) => (
                          <tr key={index}>
                              <td>{student.name}</td><td>{student.subject}</td><td>{student.level}</td><td>{student.interest}</td><td>{student.age}</td><td>{student.questions_answered}</td><td>{student.questions_correct}</td><td>{student.questions_incorrect}</td><td>{student.percentage_correct}%</td>
                              <td>
                                  <a
                                      href={`https://localhost:44427/student?name=${encodeURIComponent(student.name)}&subject=${encodeURIComponent(student.subject)}&interest=${encodeURIComponent(student.interest)}&level=${encodeURIComponent(student.level)}`}
                                  >
                                      View
                                  </a>
                            </td>
                          </tr>
                      ))}
                  </tbody>
                </table>
                <br />
          </div>
    );
  }
}
