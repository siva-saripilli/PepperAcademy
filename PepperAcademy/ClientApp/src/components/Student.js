import React, { Component } from 'react';
import Speech from './Speech';

export class Student extends Component {
    render() {
        return (
            <div className="main">
                <h1>Voice to text</h1>
                <Speech />
            </div>
        );
    }
}