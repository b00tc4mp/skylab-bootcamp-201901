import React, { Component } from 'react'

import ExerciseItem from '../ExerciseItem/index'
import logic from '../../logic';

class ExerciseList extends Component {
    state = { exercises: [] }

    componentDidMount() {
        logic.exerciseList()
            .then(exercises => {
                this.setState({ exercises })
                console.log(exercises)
            })
    }

    render() {
        const { state: { exercises } } = this
        return (
            <main className="exercise-list">
                <p>{exercises.length} exercises</p>
                {exercises.map((exercise) => <ExerciseItem results={exercise} />)}
            </main>
        )
    }
}

export default ExerciseList