import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'


class EditPet extends Component {

    state = { users: [], pets: [], name: '', microchip: '', petlicence: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    componentDidMount() {
        this.retrieveUsers()
    }

    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        this.retrievePets(usersId)
    }

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    retrievePets = async userId => {
        const pets = await logic.retrievePets(userId)
        this.setState({ pets })
    }

    handleSelectPet = async event => {
        event.preventDefault()
        const petsId = event.target.value
        const {name, microchip, petlicence} = await logic.retrievePet(petsId)
        this.setState({petsId, name, microchip, petlicence})
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }
      
    handleEditSubmit = event => {
        event.preventDefault()
        const { state: { petsId, name, microchip, petlicence } } = this
        this.editPet( petsId, name, microchip, petlicence)
    }

    editPet = async (petsId, name, microchip, petlicence) => {
        try {          
            await logic.updatePet(petsId, name, microchip, petlicence)
            this.setState({isModified: true})
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {

        return <main> 
        <form className= "form__vet" onSubmit={this.handleEditSubmit}>
            <section className="form">
                <h1>Pet's details:</h1>
                <div className="input__form">
                    <label>Select Owner</label>
                    <select name="owner" onChange={this.handleSelectOwner} >
                    {<option></option>}{this.state.users.map(user => <option name="owner" value={user.id} >{user.name}{' - '}{user.email}</option>)}
                    </select>
                </div>
                <div className="input__form">
                    <label>Select Pet</label>
                    <select name="pet" onChange={this.handleSelectPet}>
                    {<option></option>}{this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                    </select>
                </div>
                <div className="input__form">
                    <label>Name</label>
                    <input value={this.state.name} type="text" name="name" onChange={this.handleOnChange} required></input>
                </div>
                <div className="input__form">
                    <label>Microchip</label>
                    <input value={this.state.microchip} type="text" name="microchip" onChange={this.handleOnChange}></input>
                </div>
                <div className="input__form">
                    <label>Pet licence</label>
                    <input value={this.state.petlicence} type="text" name="petlicence" onChange={this.handleOnChange}></input>
                </div>            

                <button type="submit" class="button">Sign in</button>
                <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
                {this.state.error && <p className="feedback  feedback__error">{this.state.error}</p>}
                {this.state.isModified && <p className="feedback feedback__success">Profile successfully updated!</p>}
            </section>
        </form>
        </main>
    }
}
export default withRouter(EditPet)
