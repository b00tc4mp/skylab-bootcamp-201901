import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'


class EditOwner extends Component {

    state = { users: [], name: '', surname: '', idCard: '', phone: '', adress: '', city: '', email: '', error: null, isModified: false }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })


    componentDidMount() {
        this.retrieveUsers()
    }

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    handleSelectChange = async event => {
        event.preventDefault()
        const userSelectedId = event.target.value
        if (!userSelectedId) return
        const { name, surname, idCard, phone, adress, city, email } = await logic.retrieveUserSelected(userSelectedId)
        this.setState({ name, surname, idCard, phone, adress, city, email })
    }


    handleEditProfile = event => {
        event.preventDefault()
        const { state: { name, surname, idCard, phone, adress, city, email } } = this
        this.editProfile(name, surname, idCard, phone, adress, city, email)
    }

    editProfile = async (name, surname, idCard, phone, adress, city, email) => {
        try {
            await logic.updateUser(name, surname, idCard, phone, adress, city, email)
            this.setState({ isModified: true, error: false })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    render() {

        return <form className= "form__vet" onSubmit={this.handleEditProfile} >
            <section class="form">
                    <h1>Owner's details:</h1>
                <div className="input__form">
                    <label>Select Owner</label>
                    <select name="owner" onChange={this.handleSelectChange}>
                        {<option></option>}{this.state.users.map(user => <option name="owner" value={user.id}>{user.name}{' - '}{user.email}</option>)}
                    </select>
                </div>
                <div className="input__form">
                    <label>Name</label>
                    <input value={this.state.name} type="text" name="name" onChange={this.handleOnChange} />
                </div>
                <div className="input__form">
                    <label>Surname</label>
                    <input value={this.state.surname} type="text" name="surname" onChange={this.handleOnChange}></input>
                </div>
                <div className="input__form">
                    <label>Id Card</label>
                    <input value={this.state.idCard} type="text" name="idCard" onChange={this.handleOnChange}></input>
                </div>
                <div className="input__form">
                    <label>Phone</label>
                    <input value={this.state.phone} type="text" name="phone" onChange={this.handleOnChange}></input>
                </div>
                <div className="input__form">
                    <label>Adress</label>
                    <input value={this.state.adress} type="text" name="adress" onChange={this.handleOnChange}></input>
                </div>
                <div className="input__form">
                    <label>City</label>

                    <input value={this.state.city} type="text" name="city" onChange={this.handleOnChange}></input>
                </div>

                <button type="submit" className="button">Edit</button>
                <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
                {this.state.error && <p className="feedback feedback__error">{this.state.error}</p>}
                {this.state.isModified && <p className="feedback feedback__success">Profile successfully updated</p>}
            </section>
        </form>

    }
}


export default withRouter(EditOwner)