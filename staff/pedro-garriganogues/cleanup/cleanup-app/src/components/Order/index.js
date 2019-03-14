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
                    email: user.email
                })
            })

        this.getItems()
    }

    getItems = () => {

        logic.listProductsByIds()
            .then(cart => this.setState({ cart }))

    }

    handleSubmitOrder = (e) => {
        e.preventDefault()

        const { paymentMethod, cart, email } = this.state

        if (paymentMethod !== "" || email !== "") {

            logic.createOrder(paymentMethod, cart)
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
                                    <input type="text" name="payment method" placeholder="Payment Method" onChange={this.handlerCapturingPaymentMethod} value={this.state.paymentMethod} />
                                </div>
                                <div >
                                    <label htmlFor="lastName">email</label>
                                    <input type="text" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
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