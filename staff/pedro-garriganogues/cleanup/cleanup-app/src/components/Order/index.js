import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'


class Cart extends Component {

    constructor() {
        super()
        this.state = {
            isLogged: false,
            isRegistered: false,
            paymentMethod: '',
            cart: [],
            email: '',
        }
    }

    componentDidMount() {
        logic.retrieveUser()
            .then(user => {
                this.setState({
                    address: user.address,
                    email: user.email
                })
            })

        this.getItems()
    }

    getItems = () => {
        if (logic._cart.length && logic._cart !== 'undefined') {
            logic.listProductsByIds()
                .then(cart => this.setState({ cart }))
        } else {
            this.setState({ cart: [] })
        }
    }

    handleSubmitOrder = (e) => {
        e.preventDefault()

        const { paymentMethod, cart, address, phone, email } = this.state

        if (paymentMethod !== "" || address !== "" || email !== "" || phone !== "") {

            logic.createOrder(paymentMethod, cart, address)
                .then(
                    this.props.onOrder()

                ).catch(err => console.log(err.message))
        } else {
            console.log('Please, fill all fields')
        }
    }

    handlerCapturingPaymentMethod = (e) => {
        this.setState({ paymentMethod: e.target.value })
    }

    handlerCapturingEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlerCapturingAddress = (e) => {
        this.setState({ address: e.target.value })
    }

    handlerCapturingPhone = (e) => {
        this.setState({ phone: e.target.value })
    }

    render() {
        return (
            <main>
                <section>
                    <h1>Order</h1>
                </section>
                <ul>
                    <div>
                        {this.state.cart.map(item => (
                            <li key={item._id} >
                                <div>
                                    <img src={item.image} alt="404" />
                                    <div >
                                        <h3 >{item.name}</h3>
                                    </div>
                                </div>
                            </li>
                        ))}

                        <form onSubmit={this.handleSubmitOrder}>
                            <div >
                                <div >
                                    <label htmlFor="firstName">Payment Method</label>
                                    <input type="text" name="payment method" placeholder="Payment Method" autoFocus="" onChange={this.handlerCapturingPaymentMethod} value={this.state.paymentMethod} />
                                </div>
                                <div >
                                    <label htmlFor="lastName">email</label>
                                    <input type="text" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="username">Phone</label>
                                <div >
                                    <input type="text" name="phone" placeholder="Phone" onChange={this.handlerCapturingPhone} value={this.state.phone} />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="username">Address</label>
                                <div >
                                    <input type="text" name="address" placeholder="Address" onChange={this.handlerCapturingAddress} value={this.state.address} />
                                </div>
                            </div>

                            <button type="submit">Submit payment</button>
                        </form>
                    </div>
                </ul>


            </main>
        )
    }
}

export default Cart