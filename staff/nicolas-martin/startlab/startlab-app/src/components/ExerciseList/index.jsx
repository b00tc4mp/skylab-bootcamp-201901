import React, { Component } from 'react'
import { toast } from 'react-toastify'

import ExerciseItem from '../ExerciseItem/index'
import logic from '../../logic';

class ExerciseList extends Component {
    state = { exercises: [], feedback: null }

    componentDidMount() {
        logic.exerciseList()
            .then(exercises => {
                this.setState({ exercises })
            })
            .catch(message => this.emitFeedback(message, 'error'))
    }

    emitFeedback = (message, level) => {
        toast.dismiss()
        return toast[level](message, {
          position: 'top-right',
          autoClose: level !== 'error',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
    }

    handleDelete = (id) => {
        logic.deleteExercise(id)
            .then(({ message }) =>
                logic.exerciseList()
                    .then(exercises => {
                        this.emitFeedback(message, 'success')
                        this.setState({ exercises })
                    })
                    .catch(message => this.emitFeedback(message, 'error'))
            )
            .catch(message => this.emitFeedback(message, 'error'))
    }

    render() {
        const { state: { exercises }, handleDelete, props: { handleEdit, handleNew } } = this
        return (
            <main className="itemlist">
                <div className="itemlist__header course-header group">
                    <h1 className="itemlist__header__title title">{exercises.length}  exercises</h1>
                    <button className="itemlist__header__new button is-link is-warning" onClick={handleNew}>New</button>
                </div>

                <div className="itemlist__items" >
                    {exercises.map((exercise, index) => <ExerciseItem key={index} results={exercise} onDelete={handleDelete} onEdit={handleEdit} />)}
                </div>
            </main>
        )
    }
}

export default ExerciseList