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
            orders: [],

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
            .then(orders => {
                this.setState({
                    orders
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
                <label>Status:</label>
                {this.state.orders.map(order => <div>{order.status}</div>)}
            </div>
        </section>
        )
    }
}

export default Profile