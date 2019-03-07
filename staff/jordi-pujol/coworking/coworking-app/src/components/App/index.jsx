'use strict'

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import logic from '../../logic'

class App extends Component {

    handleRegister = (name, surname, email, password, passwordConfirm) => {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => this.props.history.push('/login'))
            .catch((error) => console.log(error)) //print it

    }

    handleLogin = (email, password) => {
        logic.logInUser(email, password)
            .then(() => this.props.history.push('/home'))
            .catch((error) => console.log(error)) //print it
    }

    render() {

        const { handleLogin, handleRegister } = this

        return <main className='app'>
            <Route exact path='/register' render={() => <Register onRegister={handleRegister} />} />
            <Route exact path='/login' render={() => <Login onLogin={handleLogin} />} />
            <Route path='/home' render={() => <Home />} />
        </main>
    }
}

export default withRouter(App)