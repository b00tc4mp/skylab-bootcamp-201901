import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

class NewService extends Component {

    state = { title: '', description: '' }

    handleTitleInput = event => this.setState({ title: event.target.value })

    handleDescriptionInput = event => this.setState({ description: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { title, description }, props: {onCreateService} } = this

        onCreateService(title, description)
    }

    render() {

        const {handleDescriptionInput, handleFormSubmit, handleTitleInput} = this

        return <section>
            <form onSubmit={handleFormSubmit}>
                <span>Title</span>
                <input onChange={handleTitleInput}></input>
                <span>Description</span>
                <input onChange={handleDescriptionInput}></input>
                <button>Create Service</button>
            </form>
        </section>
    }
}

export default withRouter(NewService)