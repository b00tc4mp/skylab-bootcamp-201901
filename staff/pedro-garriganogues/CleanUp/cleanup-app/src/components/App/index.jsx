

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Register from '../Register'
import Login from '../Login'
import About from '../About'
import Products from '../Products'
import Landing from '../Landing/index'
import Navbar from '../Navbar/index'
import Contact from '../Contact'
import Footer from '../Footer'
import Profile from '../Profile'
import Cart from '../Cart'
import Product from '../Product'
import ProductData from '../Productdata'
import AllProducts from '../Allproducts'







import logic from '../../logic'
class App extends Component {
    state = { registerFeedback: null }


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

        return (<body className="app">
            <Navbar loggedIn={this.state.loggedIn} onLogout={this.onLogout} cartLength={this.state.cartLength} />
            <Landing />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/profile" component={Profile} />

            <Route exact path="/products" render={props => <AllProducts categoryId={props.match.params.id} onAddToCart={this.onAddToCart} />} />
            <Route exact path="/categories/products/:id" render={props => <ProductData productId={props.match.params.id} onAddToCart={this.onAddToCart} />} />

            <Route exact path="/cart" component={Cart} />
            <Route exact path="/register" render={() => <Register title='Register' onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route exact path="/login" render={() => <Login onLogin={handleLogin} feedback={loginFeedback} />} />
            {/* <section><Link to="/login">Login</Link> or <Link to="/register">Register</Link></section> */}
            <Footer />
        </body>)
    }
}

export default withRouter(App)