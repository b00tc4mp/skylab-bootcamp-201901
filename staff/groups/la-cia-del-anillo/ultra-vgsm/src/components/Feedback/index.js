'use strict';

import React, { Component } from 'react';
import './index.css';

class Feedback extends Component {

    

    render() {
        const {props: {message}} = this;
        return <section className="feedback">{message}</section>;
    }
}

export default Feedback;
