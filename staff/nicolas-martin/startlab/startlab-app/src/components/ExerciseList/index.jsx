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
        const { state: { exercises, feedback }, handleDelete, props: { handleEdit, handleNew, feedbackNew } } = this
        return (
            <main className="exercise-list">
                <div className="course-header group">
                    <h2>Courses</h2>
                    <p>{exercises.length} exercises</p>
                    <button onClick={handleNew}>New</button>
                </div>

                {feedback && <Feedback message={feedback} />}
                {feedbackNew && <Feedback message={feedbackNew} />}
                {exercises.map((exercise, index) => <ExerciseItem key={index} results={exercise} onDelete={handleDelete} onEdit={handleEdit} />)}
            </main>
        )
    }
}

export default ExerciseList