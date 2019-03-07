import React, { Component } from 'react'

import Feedback from '../Feedback/'
import ActiveExercise from '../ActiveExercise'
import StartIntro from '../StartIntro'
import AnswerForm from '../AnswerForm'
import logic from '../../logic';

class Start extends Component {
    state = { exercises: [], activeExercise: undefined, startFeedback: '' }

    componentDidMount() {
        this.getExercisesFromUser()
    }

    getExercisesFromUser() {
        try {
            logic.retrieveExercisesFromUser()
                .then(exercises => {
                    const activeExercise = exercises.find(exercise => !exercise.completed).exercise
                    this.setState({ exercises, activeExercise })
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    handleAnswerSubmit = (answer) => {
        const { state: { activeExercise: { id: exerciseId } } } = this

        logic.checkCode(answer, exerciseId)
            .then(result => this.setState({startFeedback: result.message }))
            .catch (error => {
                this.setState({startFeedback: error.message })
            })
    }


    render() {
        const { state: { activeExercise, exercises, startFeedback }, handleAnswerSubmit } = this

        return (
            <main className="start">

                {exercises && <StartIntro exercises={exercises} />}

                {activeExercise && <ActiveExercise onExercise={activeExercise} />}

                {activeExercise && <AnswerForm handleSubmit={handleAnswerSubmit} />}

                {startFeedback && <Feedback message={startFeedback} />}

            </main>
        )
    }
}

export default Start