

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

        return (<main className="app">
            <Navbar loggedIn={this.state.loggedIn} onLogout={this.onLogout} cartLength={this.state.cartLength} />
            <Landing />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/register" render={() => <Register title='Register' onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route exact path="/login" render={() => <Login onLogin={handleLogin} feedback={loginFeedback} />} />
            {/* <section><Link to="/login">Login</Link> or <Link to="/register">Register</Link></section> */}
            <Footer />
        </main>)
    }
}

export default withRouter(App)