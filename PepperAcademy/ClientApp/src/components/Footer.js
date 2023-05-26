import React, { Component } from 'react';
import './Footer.css';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <div>
              <footer>
                  &copy; 2023 Pepper's Academy. All rights reserved.
              </footer>
            </div>
        );
    }
}
