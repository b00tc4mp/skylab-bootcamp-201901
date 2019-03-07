import React, { Component } from 'react'

class ActiveExercise extends Component {

    render() {
        const { props: { onExercise: { title, summary } } } = this
        return (
            <div className="start-exercise">
                <h3>{title}</h3>
                <p>{summary}</p>
            </div>
        )
    }
}

export default ActiveExercise