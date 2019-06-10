import React, { Component } from 'react'
import logic from '../../logic'
import ProductCart from '../ProductCart'
import StripePayament from '../StripePayament'
import PayamentMessage from '../PayamentMessage'

import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

class Cart extends Component {
    state = { error: null, cart: [] }

    retrieve = () => {
        try {

            logic.retrieveCart()
                .then((res) => { this.setState({ cart: res }) })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    componentDidMount() {
        this.retrieve()
    }

    handleDeleteToCart = productId => {
        try {
            logic.deleteToCart(productId)
                .then((res) => { this.setState({ cart: res }) })
                .catch(error =>
                    this.setState({ error: error.message })
                )

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handlePurchase = () => {
        try {
            logic.cartToOrder()
                .then(() => { this.setState({ cart: [] }, () => { this.props.history.push(`/cart/thankyou`) }) })
                .catch(error =>
                    this.setState({ error: error.message })
                )

        } catch ({ message }) {
            this.setState({ error: message })
        }


    }

    render() {
        const {
            state: { error, cart },
            handleDeleteToCart,
            handlePurchase
        } = this

        return <>
                <Route exact path="/cart" render={() => < ProductCart items={cart} deleteCart={handleDeleteToCart} error={error} />} />
                <Route exact path="/cart" render={() => <StripePayament onTokenSucces={handlePurchase} />} />
                <Route exact path='/cart/thankyou' render={() => <PayamentMessage />} />
        </>
    }


}

export default withRouter(Cart)