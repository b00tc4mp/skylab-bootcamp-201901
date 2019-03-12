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
            .catch(({ error }) => console.log(error))
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
            <main className="itemlist">
                <div className="itemlist__header course-header group">
                    <h1 className="subtitle is-4">{exercises.length}  exercises</h1>
                    <button className="button is-link is-warning" onClick={handleNew}>New</button>
                </div>

                <div className="itemlist__feedback" >
                    {feedback && <Feedback message={feedback} />}
                    {feedbackNew && <Feedback message={feedbackNew} />}
                </div>
                
                <div className="itemlist__items" >
                    {exercises.map((exercise, index) => <ExerciseItem key={index} results={exercise} onDelete={handleDelete} onEdit={handleEdit} />)}
                </div>
            </main>
        )
    }
}

export default ExerciseList