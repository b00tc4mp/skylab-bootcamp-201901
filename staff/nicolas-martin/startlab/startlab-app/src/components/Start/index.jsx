import React, { Component } from 'react'
import { toast } from 'react-toastify'

import Feedback from '../Feedback/'
import ActiveExercise from '../ActiveExercise'
import StartIntro from '../StartIntro'
import AnswerForm from '../AnswerForm'
import FinalMessage from '../FinalMessage'
import logic from '../../logic';

class Start extends Component {
    state = { exercises: [], activeExercise: null, startFeedback: '', answer: '' }

    componentWillMount() {
        try {
            logic.getExercises()
                .then(exercises => {
                    // const progress = exercises.find(exercise => !exercise.completed)
                    // const activeExercise = progress? progress.exercise : null
                    this.setState({ exercises })
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

    handleAnswerSubmit = event => {
        event.preventDefault()
        const { state: { answer, activeExercise: { id: exerciseId } } } = this
        logic.checkCode(answer, exerciseId)
            .then(result => {
                this.getExercisesFromUser()
            })
            .catch(error => {
                this.setState({ startFeedback: error.message })
            })
    }

    handleAnswerChange = event => this.setState({ answer: event.target.value })

    render() {
        const { state: { activeExercise, exercises, startFeedback, answer }, handleAnswerSubmit, handleAnswerChange } = this

        return (
            <main className="start">

                {exercises && <StartIntro exercises={exercises} />}

                {activeExercise && <ActiveExercise onExercise={activeExercise} />}

                {activeExercise && <AnswerForm previousAnswer={answer} manageChange={handleAnswerChange} manageSubmit={handleAnswerSubmit} />}

                {startFeedback && <Feedback message={startFeedback} />}

                {!activeExercise && <FinalMessage />}

            </main>
        )
    }
}

export default Start