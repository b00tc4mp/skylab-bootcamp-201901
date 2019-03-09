import React, { Component } from 'react'

import Feedback from '../Feedback'
import AnswerForm from '../AnswerForm'

import logic from '../../logic'

class ExerciseForm extends Component {
    state = { title: '', summary: '', test: '', answer: '', id: '', order: 0, feedback: '', pageTitle: 'New exercise' }

    componentDidMount() {
        if (this.props.id) {
            logic.retrieveExercise(this.props.id)
                .then(exercise => {
                    this.setState({
                        title: exercise.title,
                        summary: exercise.summary,
                        test: exercise.test,
                        id: exercise.id,
                        order: exercise.order,
                        pageTitle: 'Edit exercise'
                    })
                })
                .catch(message => console.log(message))
        }
    }

    handleTitleInput = event => this.setState({ title: event.target.value })

    handleSummaryInput = event => this.setState({ summary: event.target.value })

    handleTestInput = event => this.setState({ test: event.target.value })

    handleAnswerInput = event => this.setState({ answer: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        if (this.props.id)
            return this.handleUpdate()
        this.handleNew()
    }

    handleUpdate = () => {
        try {
            const { title, summary, test, id, order } = this.state
            logic.updateExercise({ title, summary, test, id, order })
                .then(message => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleNew = () => {
        try {
            const { state: { title, summary, test, id, order }, props: { onNew } } = this
            logic.newExercise({ title, summary, test, id, order })
                .then(message => {
                    onNew(message)
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleTestSubmit = event => {
        event.preventDefault()
        const { state: { answer, id: exerciseId } } = this

        logic.checkCode(answer, exerciseId)
            .then(result => {
                this.setState({ feedback: 'Ok!' })
            })
            .catch(error => {
                this.setState({ feedback: error.message })
            })
    }

    render() {
        const { state: { pageTitle, title, summary, test, answer, feedback },
            handleTestSubmit, handleFormSubmit, handleTitleInput, handleSummaryInput, handleTestInput, handleAnswerInput } = this

        return (
            <section className="exercise-form">
                <div className="course-header group">
                    <h2>{pageTitle}</h2>
                    {feedback && <Feedback message={feedback} />}
                </div>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" onChange={handleTitleInput} value={title} required />

                    <label htmlFor="summary">Summary</label>
                    <textarea id="summary" type="text" name="summary" onChange={handleSummaryInput} value={summary} required />

                    <label htmlFor="test">Test</label>
                    <textarea id="test" type="text" name="test" onChange={handleTestInput} value={test} required />

                    <button type="submit">Save</button>
                </form>

                <AnswerForm manageChange={handleAnswerInput} manageSubmit={handleTestSubmit} previousAnswer={answer} />
            </section>
        )
    }
}

export default ExerciseForm