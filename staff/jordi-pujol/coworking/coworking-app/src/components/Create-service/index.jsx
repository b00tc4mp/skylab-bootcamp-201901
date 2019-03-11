import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'

class NewService extends Component {

    state = { title: '', description: '', maxUsers: 1, place: 'Not specified' }

    handleTitleInput = event => this.setState({ title: event.target.value })

    handleDescriptionInput = event => this.setState({ description: event.target.value })

    handleMaxUsersInput = event => {
        if (event.target.value !== '') {
            this.setState({ maxUsers: Number(event.target.value) })}}

    handlePlaceInput = event => {
        if (event.target.value !== '') this.setState({ place: event.target.value })}

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { title, description, maxUsers, place }, props: { onCreateService } } = this

        onCreateService(title, description, maxUsers, place)
    }

    render() {

        const { props:{feedback}, handleDescriptionInput, handleFormSubmit, handleTitleInput, handleMaxUsersInput, handlePlaceInput } = this

        return <section>
            <form onSubmit={handleFormSubmit}>
                <span>Title</span>
                <input onChange={handleTitleInput}></input>
                <span>Description</span>
                <input onChange={handleDescriptionInput}></input>
                <span>Max users (default: 1)</span>
                <input onChange={handleMaxUsersInput}></input>
                <span>Place (default: Not specified)</span>
                <input onChange={handlePlaceInput}></input>
                <button>Create Service</button>
            </form>
            {feedback && <Feedback message={feedback}/>}
        </section>
    }
}

export default withRouter(NewService)