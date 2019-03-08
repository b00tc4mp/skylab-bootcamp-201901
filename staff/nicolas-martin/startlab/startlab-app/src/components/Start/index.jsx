import React, { Component } from 'react'

import Feedback from '../Feedback/'
import ActiveExercise from '../ActiveExercise'
import StartIntro from '../StartIntro'
import AnswerForm from '../AnswerForm'
import FinalMessage from '../FinalMessage'
import logic from '../../logic';

class Start extends Component {
    state = { exercises: [], activeExercise: null, startFeedback: '', answer: '' }

    componentDidMount() {
        this.getExercisesFromUser()
    }

    getExercisesFromUser() {
        try {
            logic.retrieveExercisesFromUser()
                .then(exercises => {
                    // const activeExercise = exercises.find(exercise => !exercise.completed).exercise
                    const progress = exercises.find(exercise => !exercise.completed)
                    const activeExercise = progress? progress.exercise : null
                    this.setState({ exercises, activeExercise, startFeedback: '', answer: '' })
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

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