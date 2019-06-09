import React, { Component } from 'react'
import logic from '../../logic'
import ProductCart from '../ProductCart'
import { Route, withRouter, Redirect } from 'react-router-dom'

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

    handleDeleteToCart = productId =>{
        try {
            logic.deleteToCart(productId)
            .then((res) => { this.setState({ cart: res }) })
            
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        const {
            state: { error, cart },
            handleDeleteToCart
        } = this

        return <>
            <h1>Cesta</h1>
            <Route path="/cart" render={() => < ProductCart items={cart} deleteCart={handleDeleteToCart} error={error} />} />
        </>
    }


}

export default withRouter(Cart)