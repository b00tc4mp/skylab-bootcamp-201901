import React, { Component } from 'react'
import logic from '../../logic'


class EditPet extends Component {

    state = { users: [], pets: [], name: '', microchip: '', petlicence: '', neutered: '', vaccionations: '', controls: '', details: '', error: null }

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
        debugger
        this.setState({ pets })
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }
    
    
    handleEditSubmit = event => {
        debugger
        event.preventDefault()
        const { state: { petsId, name, microchip, petlicence, neutered } } = this
        this.editPet( petsId, name, microchip, petlicence, neutered)
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

        return <form onSubmit={this.handleEditSubmit}>
            <section class="form">
                <p className="title__form">Pet's details:</p>
                <div className="input__form">
                    <label onClick={this.handleSelect}>Select Owner</label>
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
                    <label>Name</label>
                    <input value={this.state.name} type="text" name="name" onChange={this.handleOnChange} required></input>
                </div>
                <div className="input__form">
                    <label>Microchip</label>
                    <input value={this.state.microchip} type="microchip" name="microchip" onChange={this.handleOnChange}></input>
                </div>
                <div className="input__form">
                    <label>Pet licence</label>
                    <input value={this.state.petlicence} type="text" name="petlicence" onChange={this.handleOnChange}></input>
                </div>
                <label>Neutered</label>
                <div className="radio">
                    <label>
                        <input value={this.state.neutered} type="radio" name="neutered" value="yes" onChange={this.handleOnChange} />
                        yes
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input value={this.state.neutered} type="radio" name="neutered" value="no" onChange={this.handleOnChange} />
                        no
                    </label>
                </div>

                <button type="submit" class="button">Sign in</button>
                <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
                {this.state.error && <p className="feedbackError">{this.state.error}</p>}
                {this.state.isRegister && <p className="feedbackOk">You have successfully edited !</p>}
            </section>
        </form>


    }
}
export default EditPet
