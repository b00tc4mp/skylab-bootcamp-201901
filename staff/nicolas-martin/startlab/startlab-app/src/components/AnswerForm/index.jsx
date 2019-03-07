import React, { Component } from 'react'

class AnswerForm extends Component {
    state = { answer: '' }

    handleAnswerChange = event => this.setState({ answer: event.target.value })

    manageSubmit = event => {
        event.preventDefault()
        const { props: { handleSubmit } } = this
        handleSubmit(this.state.answer)
    }

    render() {
        const { manageSubmit, handleAnswerChange } = this
        return (
            <form onSubmit={manageSubmit} >
                <textarea type="text" placeholder="start coding your solution here..." onChange={handleAnswerChange} required />
                <button>Enviar</button>
            </form>
        )
    }
}

export default AnswerForm