import React, { Component } from 'react'
import Footer from '../footer'
import './index.css'
import logic from '../../logic'
import swal from 'sweetalert2'


class Cart extends Component {

    constructor() {
        super()
        this.state = {
            isLogged: false,
            isRegistered: false,
            paymentMethod: '',
            cart: [],
            address: '',
            email: '',
            phone: ''
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
                .then(res => {
                    swal({
                        title: `<h2>Congratulations!</h2>`,
                        html:
                            `<h3>Your order was registered with:</h3>
                             <div>Id number: <i>${res}</i></div>
                            <div>Phone: <i>${phone}</i></div>
                            <div>Email: <i>${email}</i></div>
                            <div>Address: <i>${address}</i></div>`,
                        type: 'success',
                        width: 500,
                        padding: '3em',
                        backdrop: `
                          rgb(121, 27, 105, 0.3)
                          url("https://media.giphy.com/media/idKFx1AUCg1Yk/giphy.gif")
                          top left
                          no-repeat
                        `
                    })
                    this.props.onOrder()

                }).catch(err => swal(err.message))
        } else {
            swal('Please, fill all fields')
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
                <section className="main-title my-order-title">
                    <i className="far fa-credit-card my-card-title"></i>
                    <h2 className="my-order-title"> My order</h2>
                    <i className="fas fa-truck title-shopping-truck"></i>
                </section>
                <ul className="listitems-body">
                    <div className="thumbnail listitems-subbody">
                        {this.state.cart.map(item => (
                            <li key={item._id} className="items">
                                <div className="card" style={{ width: '18rem' }}>
                                    <img className="card-img-top" src={item.image} alt="course or category" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                    </div>
                                </div>
                            </li>
                        ))}

                        <form className="form-register" onSubmit={this.handleSubmitOrder} noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">Payment Method</label>
                                    <input type="text" className="form-control" name="payment method" placeholder="Payment Method" autoFocus="" onChange={this.handlerCapturingPaymentMethod} value={this.state.paymentMethod} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">email</label>
                                    <input type="text" className="form-control" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">Phone</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={this.handlerCapturingPhone} value={this.state.phone} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">Address</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" name="address" placeholder="Address" onChange={this.handlerCapturingAddress} value={this.state.address} />
                                </div>
                            </div>

                            <button className="btn btn-primary btn-lg btn-block register-submit" type="submit">Submit payment</button>
                        </form>
                    </div>
                </ul>

                <Footer />
            </main>
        )
    }
}

export default Cart