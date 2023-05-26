import React, { Component } from 'react';

export class OutputContainer extends Component {
    static displayName = OutputContainer.name;

    render() {
        return (
            <div>
                <p> This is the output.js component - remove this text later!</p>
                <div id="output-container" style={{ display: 'none' }}>
                    <h2>Form Submitted Successfully!</h2>
                    <p id="submittedStudent"></p>
                    <p id="submittedCourse"></p>
                    <p id="submittedLevel"></p>
                    <p id="submittedInterest"></p>
                </div>
            </div>
        );
    }
}
