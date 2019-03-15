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
                    name: user.data.name,
                    surname: user.data.surname,
                    email: user.data.email,
                })
            })
    }

    render() {
        return (<section>
            <h1 className="title">Profile:</h1>
            <div className="userinfo">
                <label>Name</label>
                <input placeholder={`${this.state.name}`} />
                <label>Surname</label>
                <input placeholder={`${this.state.surname}`} />
                <label>Email:</label>
                <input placeholder={`${this.state.email}`} />
                <label>Purchashing history:</label>
                <input placeholder={`${this.state.email}`} />
            </div>
        </section>
        )
    }
}

export default Profile