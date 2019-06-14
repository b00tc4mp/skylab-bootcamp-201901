import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../../logic'


class Visit extends Component {

    state = { users: [], pets: [], vaccionations: '', controls: '', details: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })


    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        this.retrievePets(usersId)
    }

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    retrievePets = async (userId) => {
        const pets = await logic.retrievePets(userId)
        this.setState({ pets })
    }

    componentDidMount() {
        this.retrieveUsers()
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    handleSelectPet = async event => {
        event.preventDefault()
        const petsId = event.target.value
        const { vaccionations, controls, details } = await logic.retrievePetVisit(petsId)
        this.setState({ petsId, vaccionations, controls, details })
    }

    handleVisitSubmit = event => {
        event.preventDefault()
        const { state: { petsId, vaccionations, controls, details } } = this
        this.editVisit(petsId, vaccionations, controls, details)
    }

    editVisit = async (petsId, vaccionations, controls, details) => {
        try {
            await logic.updateVisit(petsId, vaccionations, controls, details)
            this.setState({ isModified: true })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {

        return <form className= "form__vet" onSubmit={this.handleVisitSubmit}>
            <section className="form">
                <h1>Visit details:</h1>
                <div className="input__form">
                    <label>Select Owner</label>
                    <select name="owner" onChange={this.handleSelectOwner}>
                        {<option></option>}{this.state.users.map(user => <option name="owner" value={user.id}>{user.name}{' '}{user.email}</option>)}
                    </select>
                </div>
                <div className="input__form">
                    <label>Select Pet</label>
                    <select name="pet" onChange={this.handleSelectPet}>
                        {<option></option>}{this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                    </select>
                </div>

                <div className="input__form">
                    <label>Vaccionations and booster shots:</label>
                    <textarea value={this.state.vaccionations} name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
                </div>
                <div className="input__form">
                    <label>Veterinary controls:</label>
                    <textarea value={this.state.controls} name="controls" onChange={this.handleOnChange} rows="20"></textarea>
                </div>
                <div className="input__form">
                    <label>Details of clinical interests:</label>
                    <textarea value={this.state.details} name="details" onChange={this.handleOnChange} rows="10"></textarea>
                </div>

                <button type="submit" class="button">Edit</button>
                <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
                {this.state.error && <p className="feedback feedback__error">{this.state.error}</p>}
                {this.state.isModified && <p className="feedback feedback__success">Visit successfully updated</p>}
            </section>
        </form>

    }
}

export default withRouter(Visit)
