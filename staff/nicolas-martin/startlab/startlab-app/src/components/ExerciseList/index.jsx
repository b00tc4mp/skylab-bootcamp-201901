import React, { Component } from 'react'

import ExerciseItem from '../ExerciseItem/index'
import Feedback from '../Feedback/index'
import logic from '../../logic';

class ExerciseList extends Component {
    state = { exercises: [], feedback: null }

    componentDidMount() {
        logic.exerciseList()
            .then(exercises => {
                this.setState({ exercises })
            })
    }

    handleDelete = (id) => {
        logic.deleteExercise(id)
            .then(({ message }) =>
                logic.exerciseList()
                    .then(exercises => {
                        this.setState({ exercises, feedback: message })
                    })
                    .catch(({ error }) => console.log(error))
            )
            .catch(({ error }) => console.log(error))
    }

    render() {
        const { state: { exercises, feedback }, handleDelete, props: {handleEdit}} = this
        return (
            <main className="exercise-list">
                <p>{exercises.length} exercises</p>
                {feedback && <Feedback message={feedback} />}
                {exercises.map((exercise) => <ExerciseItem results={exercise} onDelete={handleDelete} onEdit={handleEdit}/>)}
            </main>
        )
    }
}

export default ExerciseList