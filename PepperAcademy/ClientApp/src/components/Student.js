import React, { Component } from 'react';
import Speech from './Speech';

export class Student extends Component {
    render() {
        const urlParams = new URLSearchParams(window.location.search);
        const age = urlParams.get('age');
        const name = urlParams.get('name');
        const subject = urlParams.get('subject');
        const interest = urlParams.get('interest');
        const level = urlParams.get('level');

        return (
            <div className="main">
                <div className="student-info">
                    <h1>Student Information</h1>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                    <p><strong>Interest:</strong> {interest}</p>
                    <p><strong>Level:</strong> {level}</p>
                    <p><strong>Age:</strong> {age}</p>
                </div>
                <div className="voice-to-text">
                    <h1>Voice to Text</h1>
                    <Speech />
                </div>
            </div>
        );
    }
}
