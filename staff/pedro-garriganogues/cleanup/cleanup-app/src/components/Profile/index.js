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
            order: '',

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
        logic.retrieveOrder()
            .then(order => {
                console.log(order);
                this.setState({
                    order: order.data.paymentMethod
                })
            })
    }


    render() {
        return (<section>
            <h1 className="title">Profile:</h1>
            <div className="userinfo">
                <label>Name</label>
                <input value={`${this.state.name}`} />
                <label>Surname</label>
                <input value={`${this.state.surname}`} />
                <label>Email:</label>
                <input value={`${this.state.email}`} />
                <label>Payment method:</label>
                <input value={`${this.state.paymentMethod}`} />
            </div>
        </section>
        )
    }
}

export default Profile