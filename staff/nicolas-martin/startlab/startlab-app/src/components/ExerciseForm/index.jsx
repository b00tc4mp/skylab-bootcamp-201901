import React, { Component } from 'react'

import Feedback from '../Feedback'

import logic from '../../logic'

class ExerciseForm extends Component {
    state = { title: '', summary: '', test: '', id: '', order: 0, editFeedback: null, pageTitle: 'New exercise' }

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
                .then(message => this.setState({ editFeedback: message }))
        } catch ({ message }) {
            this.setState({ editFeedback: message })
        }
    }

    handleNew = () => {
        try {
            const { state: { title, summary, test, id, order }, props: {onNew} } = this
            logic.newExercise({ title, summary, test, id, order })
                .then(message => {
                    onNew(message)
                })
                .catch(({ message }) => this.setState({ editFeedback: message }))
        } catch ({ message }) {
            this.setState({ editFeedback: message })
        }
    }

    render() {
        const { state: { pageTitle, title, summary, test, editFeedback }, handleFormSubmit, handleTitleInput, handleSummaryInput, handleTestInput } = this

        return (
            <section className="exercise-form">
                <div class="course-header group">
                    <h2>{pageTitle}</h2>
                    {editFeedback && <Feedback message={editFeedback} />}
                </div>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="title" onChange={handleTitleInput} value={title} required />
                    <textarea type="text" name="summary" onChange={handleSummaryInput} value={summary} required />
                    <textarea type="text" name="test" onChange={handleTestInput} value={test} required />
                    <button type="submit">Save</button>
                </form>
            </section>
        )
    }
}

export default ExerciseForm