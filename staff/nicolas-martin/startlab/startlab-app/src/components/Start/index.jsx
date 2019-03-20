import React, { Component } from 'react'
import { toast } from 'react-toastify'

import ActiveExercise from '../ActiveExercise'
import StartIntro from '../StartIntro'
import AnswerForm from '../AnswerForm'
import FinalMessage from '../FinalMessage'
import ResultsTest from '../ResultsTest'
import logic from '../../logic';

class Start extends Component {
    state = {
        exercises: [],
        activeExercise: null,
        answer: '',
        showResults: false,
        checkResponse: false
    }

    componentWillMount() {
        try {
            this.getExercises()
        } catch ({ message }) {
            this.emitFeedback(message, 'error')
        }
    }

    getExercises = () => {
        logic.getExercisesFromUser()
            .then(exercises => {
                const activeExercise = exercises.find(exercise => !exercise.completed)
                this.setState({ exercises, activeExercise, answer: '', failures: [], checkResponse: false })
            })
            .catch(message => this.emitFeedback(message, 'error'))
    }

    handleAnswerSubmit = event => {
        event.preventDefault()
        const { state: { answer, activeExercise: { exercise: { _id } } } } = this

        try {
            logic.checkCode(answer, _id)
                .then(({ passes, failures }) => this.checkResponse(passes, failures))
                .catch(message => {
                    let _failures = [{ err: { message } }]
                    this.checkResponse('', _failures)
                })
        } catch ({ message }) {
            this.emitFeedback(message, 'error')
        }
    }

    checkResponse = (passes, failures) => {
        const { state: { activeExercise: { _id }, answer } } = this

        if (!failures.length) {    // right answer!
            try {
                logic.updateExerciseFromUser(_id, answer)
                    .then(() => {
                        this.getExercises()
                        this.emitFeedback('right answer!', 'success')
                    })
                    .catch(message => this.emitFeedback(message, 'error'))
            } catch ({ message }) {
                this.emitFeedback(message, 'error')
            }
        } else {    // wrong answer!
            try {
                this.setState({ failures, checkResponse: true })
            } catch ({ message }) {
                this.emitFeedback(message, 'error')
            }
        }
    }

    handleAnswerChange = answer => this.setState({ answer })

    emitFeedback = (message, level) => toast[level](message, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    })

    render() {
        const { state: { activeExercise, exercises, failures, checkResponse, answer },
            handleAnswerSubmit, handleAnswerChange } = this

        return (
            <main className="start">

                {activeExercise && <StartIntro exercises={exercises} idActiveExercise={activeExercise.exercise._id}  />}

                {activeExercise && <ActiveExercise activeExercise={activeExercise} />}

                {activeExercise && <AnswerForm manageChange={handleAnswerChange} manageSubmit={handleAnswerSubmit} answer={answer} />}

                <hr />

                {activeExercise && checkResponse && <ResultsTest failures={failures} />}

                {!activeExercise && <FinalMessage />}

            </main>
        )
    }
}

export default Start