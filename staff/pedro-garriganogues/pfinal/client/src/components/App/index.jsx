

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Register from '../Register'
import Login from '../Login'
import Landing from '../Landing/index'
import Navbar from '../Navbar/index'



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
            <Route path="/register" render={() => <Register title='Register' onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route path="/login" render={() => <Login onLogin={handleLogin} feedback={loginFeedback} />} />
            {/* <section><Link to="/login">Login</Link> or <Link to="/register">Register</Link></section> */}
            <Landing />
        </main>)
    }
}

export default withRouter(App)