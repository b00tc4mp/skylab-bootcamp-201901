import React, { Component } from 'react'
import './index.css'
import logic from '../../logic'




class Profile extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            surname: '',
            email: '',

        }
    }

    componentDidMount() {
        logic.retrieveUser()
            .then(user => {

                this.setState({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    phone: user.phone
                })
            })
    }

    render() {
        return (
            <div>
                <h1 className="title">Profile:</h1>
                <label htmlFor="firstName">First name</label>
                <input type="text" placeholder={this.state.name} />
            </div>
        )
    }
}

export default Profile