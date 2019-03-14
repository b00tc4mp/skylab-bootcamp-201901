import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Order from '../Order'
import Register from '../Register'
import Login from '../Login'
import About from '../About'
// import Products from '../Products'
import Landing from '../Landing/index'
import Navbar from '../Navbar/index'
import Contact from '../Contact'
import Footer from '../Footer'
import Profile from '../Profile'
import Cart from '../Cart'
import Product from '../Product'
import Totalproducts from '../Totalproducts'


import logic from '../../logic'
class App extends Component {
    state = {
        cart: [],
        total: [],
        loggedIn: logic.loggedIn,
        // cartLength: logic.cart().length,
    }

    onLogin = () => {
        this.setState({ loggedIn: true })

        this.props.history.push('/')
    }

    onLogout = () => {
        this.setState({ loggedIn: false })
    }

    onOrder = () => {
        logic.clearCart()

        this.getItems()

        this.props.history.push('/')
    }


    getItems = () => {
        if (__userApiProducts__ && logic._cart !== 'undefined') {
            logic.listProductsByIds()
                .then(cart => this.setState({ cart, total: [], cartLength: logic.cart().length }))
        } else {
            this.setState({ cart: [], total: [], cartLength: logic.cart().length })
        }
    }

    onRemoveFromCart = id => {
        logic.removeProductFromCart(id);

        this.getItems();
    }

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => this.props.history.push('/login'))
                .catch(({ message }) => this.setState({ registerFeedback: message }))
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleLogin = (email, password) => {
        try {
            logic.logInUser(email, password)
                .then(() => this.props.history.push('/'))
                .catch(({ message }) => this.setState({ loginFeedback: message }))
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }




    render() {
        const { state: { loginFeedback, registerFeedback }, handleLogin, handleRegister } = this

        return (<main className="app">
            <Navbar loggedIn={this.state.loggedIn} onLogout={this.onLogout} cartLength={this.state.cartLength} />
            <Landing />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/products" render={props => <Totalproducts categoryId={props.match.params.id} />} />
            <Route exact path="/product/:id" render={props => <Product productId={props.match.params.id} />} />
            <Route exact path="/cart" render={() => <Cart cart={[]} total={[]} />} />
            <Route exact path="/register" render={() => <Register title='Register' onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route exact path="/login" render={() => <Login onLogin={handleLogin} feedback={loginFeedback} />} />

            <Route exact path="/order" render={() => <Order onOrder={this.onOrder} />} />
            <Footer />
        </main>)
    }
}

export default withRouter(App)

