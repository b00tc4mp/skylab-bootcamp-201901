import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


class Order extends Component {

    constructor() {
        super()
        this.state = {
            isLogged: false,
            isRegistered: false,
            paymentMethod: '',
            cart: null,
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
        const items = logic.getCart()
        this.setState({ cart: items })

    }



    handleSubmitOrder = (e) => {
        e.preventDefault()

        const { paymentMethod, cart, email } = this.state
        if (paymentMethod !== "" || email !== "") {

            logic.makeOrder(paymentMethod, cart)
                .then(
                    this.props.onOrder()
                ).catch(err => console.log(err.message))
        } else {
            console.log('Please, fill all fields')
        }
        Toast.fire({
            type: 'success',
            title: 'Thank you for your order'
        })
    }

    handlerCapturingPaymentMethod = (e) => {
        this.setState({ paymentMethod: e.target.value })
    }

    handlerCapturingEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    render() {
        return (
            <section>
                <h1 className="title">Payment info:</h1>
                {<p id="demo"></p>}
                <section className="globalsectionorder">
                    <ul>
                        <div>
                            <form onSubmit={this.handleSubmitOrder}>
                                <div className="paymentemail" >
                                    <label>Email:</label>
                                    <br />
                                    <br />
                                    <input type="text" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
                                    <br />
                                    <br />
                                    <label>Payment Method:</label>
                                    <br />
                                    <br />
                                    <input type="text" name="payment method" placeholder="Payment Method" onChange={this.handlerCapturingPaymentMethod} value={this.state.paymentMethod} />
                                    <br />
                                    <br />
                                    <label>Card number:</label>
                                    <br />
                                    <br />
                                    <input type="number" placeholder="Card number" />
                                    <br />
                                    <br />
                                    <label>Secret number:</label>
                                    <br />
                                    <br />
                                    <input type="number" placeholder="Secret number" />
                                    <br />
                                    <br />
                                    <button type="submit" className="submitbutton" >Submit payment</button>
                                </div>
                            </form>
                        </div>
                    </ul>
                </section>
            </section>
        )
    }
}

export default Order