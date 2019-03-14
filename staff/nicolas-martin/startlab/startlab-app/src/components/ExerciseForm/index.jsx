import React, { Component } from 'react'
import { toast } from 'react-toastify'

import AnswerForm from '../AnswerForm'
import ResultsTest from '../ResultsTest'

import logic from '../../logic'

class ExerciseForm extends Component {
    state = {
        title: '',
        summary: '',
        test: '',
        answer: '',
        id: '',
        theme: 0,
        order: 0,
        result: [],
        pageTitle: 'New exercise',
        passes: [],
        failures: [],
        checkCode: false
    }

    componentWillMount() {
        try {
            logic.retrieveExercise(this.props.id)
                .then(exercise => {
                    exercise.theme = parseInt(exercise.theme, 10)
                    this.setState({
                        title: exercise.title,
                        summary: exercise.summary,
                        test: exercise.test,
                        id: exercise.id,
                        order: exercise.order,
                        theme: parseInt(exercise.theme, 10),
                        pageTitle: 'Edit exercise'
                    })
                })
                .catch(message => this.emitFeedback(message, 'error'))
        } catch ({ message }) {
            this.emitFeedback(message, 'error')
        }
    }

    emitFeedback = (message, level) => toast[level](message, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })

    handleTitleInput = event => this.setState({ title: event.target.value })

    handleSummaryInput = event => this.setState({ summary: event.target.value })

    handleTestInput = event => this.setState({ test: event.target.value })

    handleAnswerInput = event => this.setState({ answer: event.target.value })

    handleThemeInput = event => this.setState({ theme: parseInt(event.target.value, 10) })

    handleFormSubmit = event => {
        event.preventDefault()
        if (this.props.id)
            return this.handleUpdate()
        this.handleNew()
    }

    handleUpdate = () => {
        try {
            const { title, summary, test, id, order, theme } = this.state
            logic.updateExercise({ title, summary, test, id, order, theme })
                .then(message => this.emitFeedback(message, 'success'))
                .catch(({ message }) => this.emitFeedback(message, 'error'))
        } catch ({ message }) {
            this.emitFeedback(message, 'error')
        }
    }

    handleNew = () => {
        try {
            const { state: { title, summary, test, order, theme }, props: { onNew } } = this
            logic.newExercise({ title, summary, test, order, theme })
                .then(message => {
                    onNew(message)
                })
                .catch(({ message }) => this.emitFeedback(message, 'error'))
        } catch ({ message }) {
            this.emitFeedback(message, 'error')
        }
    }

    handleTestSubmit = event => {
        event.preventDefault()
        const { state: { answer, id: exerciseId } } = this

        try {
            logic.checkCode(answer, exerciseId)
                .then(({ passes, failures }) => {
                    this.setState({ passes, failures, checkCode: true })
                })
                .catch(({ message }) => this.emitFeedback(message, 'error'))
        } catch ({ message }) {
            this.emitFeedback(message, 'error')
        }
    }

    render() {
        const { state: { pageTitle, title, summary, test, answer, theme, passes, failures, checkCode},
            handleTestSubmit, handleFormSubmit, handleTitleInput,
            handleSummaryInput, handleTestInput, handleAnswerInput, handleThemeInput } = this

        return (
            <section className="exercise-form">
                <div className="course-header group">
                    <h2>{pageTitle}</h2>
                </div>

                <form onSubmit={handleFormSubmit}>

                    <div className="field">
                        <label className="label" htmlFor="title">Title</label>
                        <div className="control">
                            <input autoCorrect={false} className="input" id="title" type="text" name="title" onChange={handleTitleInput} value={title} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="theme">Theme</label>
                        <div className="control">
                            <input autoCorrect={false} className="input" id="theme" type="number" min="0" name="theme" onChange={handleThemeInput} value={theme} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="summary">Summary</label>
                        <div className="control">
                            <textarea autoCorrect={false} className="textarea" id="summary" type="text" name="summary" onChange={handleSummaryInput} value={summary} rows="10" required />
                        </div>
                        <p className="help">Markdown accepted - <a rel="noopener noreferrer" target="_blank" href="https://es.wikipedia.org/wiki/Markdown#Ejemplos_de_sintaxis">examples</a></p>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="test">Test</label>
                        <div className="control">
                            <textarea autoCorrect={false} className="textarea" id="test" type="text" name="test" onChange={handleTestInput} value={test} rows="10" required />
                        </div>
                    </div>

                    <button className="button is-info" type="submit">Save</button>
                </form>

                {checkCode && <ResultsTest failures={failures} passes={passes}/>}
                <AnswerForm manageChange={handleAnswerInput} manageSubmit={handleTestSubmit} previousAnswer={answer} />
            </section>
        )
    }
}

export default ExerciseForm