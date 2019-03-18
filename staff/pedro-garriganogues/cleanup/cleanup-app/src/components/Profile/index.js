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
            </div>

            <table className="sectionpaymenthistory">
                <div className="innerpayment">
                    <label>Payment Method:</label>
                    {this.state.orders.map(order => <div>{order.paymentMethod}</div>)}
                </div>
                <div className="innerpayment">
                    <label>Status:</label>
                    {this.state.orders.map(order => <div>{order.status}</div>)}
                </div>
                <div className="innerpayment">
                    <label>Product reference:</label>
                    {this.state.orders.map(order => <div>{order.product}</div>)}
                </div>
            </table>
        </section>
        )
    }
}

export default Profile