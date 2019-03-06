import React, { Component } from 'react'
import logic from '../../logic'


class Visit extends Component {

    state = { users: [], pets: [], vaccionations: '', controls: '', details: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    retrievePets = async (userId) => {
        const pets = await logic.retrievePets(userId)
        this.setState({ pets })
    }

    componentDidMount() {
        this.retrieveUsers()
    }

    retrievePets = async userId => {
        const pets = await logic.retrievePets(userId)
        this.setState({ pets })
    }

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        this.retrievePets(usersId)
    }

    handleVisitSubmit = event => {
        debugger
        event.preventDefault()
        const { state: { petsId, name, microchip, petlicence, neutered } } = this
        this.editPet( petsId, name, microchip, petlicence, neutered)
    }

    handleSelectPet = async event => {
        event.preventDefault()
        const petsId = event.target.value
        console.log(petsId)
        const pets = await logic.retrievePets(petsId)
        this.setState({ pets })
    }


    editPet = async (petsId, name, microchip, petlicence, neutered) => {
        try {
            
            await logic.updatePet(petsId, name, microchip, petlicence, neutered)
            this.setState({isModified: true})
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {

        return <form onSubmit={this.handleVisitSubmit}>
            <p className="title__form">Visit:</p>
            <section class="form">
            <p className="title__form">Pet's details:</p>
            <div className="input__form">
                <label>Select Owner</label>
                <select name="owner" onChange={this.handleSelectOwner}>
                    {this.state.users.map(user => <option name="owner" value={user.id}>{user.name}</option>)}
                </select>
            </div>
            <div className="input__form">
                <label>Select Pet</label>
                <select name="pet" onChange={this.handleSelectPet}>
                    {this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                </select>
            </div>

            <div className="input__form">
                <label>Vaccionations and booster shots:</label>
                <textarea name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
            </div>
            <div className="input__form">
                <label>Veterinary controls:</label>
                <textarea name="controls" onChange={this.handleOnChange} rows="20"></textarea>
            </div>
            <div className="input__form">
                <label>Details of clinical interests:</label>
                <textarea name="details" onChange={this.handleOnChange} rows="10"></textarea>
            </div>
            
            <button type="submit" class="button">Sign in</button>
            <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
            {this.state.error && <p className="feedbackError">{this.state.error}</p>}
            {this.state.isRegister && <p className="feedbackOk">You have successfully edited !</p>}
            
            </section>
        </form>         
            
        }
    }

export default Visit
