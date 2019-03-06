import React, { Component } from 'react'

import Feedback from '../Feedback/'
import ActiveExercise from '../ActiveExercise'
import logic from '../../logic';

class Start extends Component {
    state = { exercises: [], startFeedback: '' }

    componentDidMount() {
        try {
            logic.retrieveExercisesFromUser()
                .then(exercises => this.setState({ exercises }))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const exercises = this.state.exercises
        const progress = exercises.find(exercise => !exercise.completed)

        return (
            <main className="start">
                <ul className="start-intro">
                    {exercises.map(({ exercise, completed }) => <li className={`${completed}`}>{exercise.title}</li>)}
                </ul>

                {progress && <ActiveExercise exercise={progress}/>}

            </main>
        )
    }
}

export default Start