

import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import Register from '../Register'
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


    render() {
        const { state: { registerFeedback }, handleRegister } = this


        return <main className="app">

            <Route path="/register" render={() => <Register title='Register' onRegister={handleRegister} feedback={registerFeedback} />} />
        </main>
    }
}

export default withRouter(App)