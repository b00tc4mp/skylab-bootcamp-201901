import React, { Component } from 'react'

import logic from '../../logic'

class ExerciseForm extends Component {
    state = { exercise: {} }

    componentDidMount() {
        logic.retrieveExercise(this.props.id)
            .then(exercise => {
                this.setState({ exercise })
            })
            .catch(message => console.log(message))
    }

    render() {
        const { state: { exercise: { title, summary, test } } } = this

        return (
            <section className="exercise-form">
                <h1>Edit exercise</h1>
                <form>
                    <input type="text" name="title" value={title} required />
                    <textarea type="text" name="summary" value={summary} required />
                    <textarea type="text" name="test" value={test} required />
                    <button>Save</button>
                </form>
            </section>
        )
    }
}

export default ExerciseForm