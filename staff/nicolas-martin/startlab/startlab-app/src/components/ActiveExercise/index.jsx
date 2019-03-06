import React, { Component } from 'react'

import Feedback from '../Feedback/'
import logic from '../../logic';

class ActiveExercise extends Component {

    render() {
        const { exercise: { exercise: { title, summary } } } = this.props
        return (
            <div className="start-exercise">
                <h3>{title}</h3>
                <p>{summary}</p>
            </div>
        )
    }
}

export default ActiveExercise