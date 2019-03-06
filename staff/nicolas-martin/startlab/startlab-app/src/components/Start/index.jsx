import React, { Component } from 'react'

import Feedback from '../Feedback/'
import logic from '../../logic';

class Start extends Component {
    state = { exercises: [], startFeedback: '' }

    componentDidCatch() {
        try {
            logic.retrieveExercisesFromUser()
                    .then(console.log)
                    .catch(console.log)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <h1>First do it</h1>
        )
    }
}

export default Start