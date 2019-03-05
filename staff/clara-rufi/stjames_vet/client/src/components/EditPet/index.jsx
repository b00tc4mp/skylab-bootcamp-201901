import React, { Component } from 'react'
import logic from '../../logic'


class EditPet extends Component {

    state = { users: [], pets:[], microchip: '', petlicence: '', neutered: '', vaccionations: '', controls: '', details: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    retrievePet = async () => {
        const { name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details } = await logic.retrieveUsers()
        this.setState({ name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details })
    }

    componentDidMount() {
        debugger
        this.retrieveUsers()
        // this.retrievePet()
    }


    retrieveUsers = async () => {
        debugger
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        console.log(usersId)
        const users = await logic.retrieveUsers(usersId)
        this.setState({ users })
    }

    handleSelectPet = async event => {
        event.preventDefault()
        const petsId = event.target.value
        console.log(petsId)
        const pets = await logic.retrievePet(petsId)
        this.setState({pets})
    }
 
    render() {

        return <form className="register" onSubmit={this.handleRegisterSubmit}>
            <p className="title__form">Pet's details:</p>
                <label>Select Owner</label>
                <select name="owner" onChange={this.handleSelectOwner}>
                    {this.state.users.map(user => <option name="owner" value={user.id}>{user.name}</option>)}
                </select>
            <div>
                <label>Select Pet</label>
                <select name="pet" onChange={this.handleSelectPet}>  
                {this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                </select>
            </div>
            <div class="form-group">
                <p className="title_register">Vaccionations and booster shots:</p>
                <textarea value={this.state.vaccionations} class="form-control" name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
            </div>

            <div class="form-group">
                <p className="title_register">Veterinary controls:</p>
                <textarea value={this.state.controls} class="form-control" name="controls" onChange={this.handleOnChange} rows="20"></textarea>
            </div>

            <div class="form-group">
                <p className="title_register">Details of clinical interests:</p>
                <textarea value={this.state.details} class="form-control" name="details" onChange={this.handleOnChange} rows="10"></textarea>
            </div>

            <button className="button" onClick={this.handleGoHome}>Go Home</button>
            {this.state.error && <p className="feedbackError">{this.state.error}</p>}
            {this.state.isRegister && <p className="feedbackOk">You have successfully edited !</p>}

        </form>


    }
}
export default EditPet
