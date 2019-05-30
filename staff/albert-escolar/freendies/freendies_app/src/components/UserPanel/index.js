import React, { Component } from 'react'
import './index.scss'


class UserPanel extends Component {

    state = {
        user: "",
        updateForm: false,
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()

        const { onUpdateUser } = this.props
        const { email, password, passwordConfirmation } = this.state

        onUpdateUser(email, password, passwordConfirmation)

    }

    updateFormHandler = (event) => {
        event.preventDefault()
        const { state: {updateForm} } = this
        updateForm ? this.setState({ updateForm: false }) : this.setState({ updateForm: true })

        // this.setState({updateForm: !updateForm}) ---- Version Mágica, nadie entiende que hace pero funciona 
                                                                                        
       
    }



    render() {
        const { state: { updateForm }, props: { user }, updateFormHandler, onInputChange, onSubmit } = this

        return <div>
            <h2>{user ? user.username : 'User'}'s Panel</h2>
            {updateForm ? <button onClick={updateFormHandler}>Close Update Info</button> : <button onClick={updateFormHandler}>Update User info</button>}
            {updateForm && < form onSubmit={onSubmit} >
                <input required name="email" placeholder="insert your user mail" type="text" onChange={event => onInputChange(event)} />
                <input required name="password" placeholder="insert your user password" type="password" onChange={event => onInputChange(event)} />
                <input required name="passwordConfirmation" placeholder="confirm you password" type="password" onChange={event => onInputChange(event)} />
                <br />
                <button>Submit</button>
            </form>}
            <h2>My Uploaded Games</h2>


        </div>

    }



}
export default UserPanel    