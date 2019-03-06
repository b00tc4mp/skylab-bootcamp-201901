import React, { Component } from 'react'
import logic from '../../logic'


class EditPet extends Component {

    state = { users: [], pets: [], microchip: '', petlicence: '', neutered: '', vaccionations: '', controls: '', details: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })


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

    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        this.retrievePets(usersId)
    }

    handleSelectPet = async event => {
        event.preventDefault()
        const petsId = event.target.value
        console.log(petsId)
        const pets = await logic.retrievePets(petsId)
        this.setState({ pets })
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }
    
    render() {

        return <form onSubmit={this.handleRegisterSubmit}>
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
                    <textarea value={this.state.vaccionations} class="form-control" name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
                </div>
                <div className="input__form">
                    <label>Veterinary controls:</label>
                    <textarea value={this.state.controls} class="form-control" name="controls" onChange={this.handleOnChange} rows="20"></textarea>
                </div>
                <div className="input__form">
                    <label>Details of clinical interests:</label>
                    <textarea value={this.state.details} class="form-control" name="details" onChange={this.handleOnChange} rows="10"></textarea>
                </div>

                <button className="button" onClick={this.handleGoHome}>Go Home</button>
                {this.state.error && <p className="feedbackError">{this.state.error}</p>}
                {this.state.isRegister && <p className="feedbackOk">You have successfully edited !</p>}
            </section>
        </form>


    }
}
export default EditPet
