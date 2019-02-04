'use strict'

import React, { Component } from 'react'
import Register from '../Register'
import logic from '../../logic';
import './index.sass'
import Header from '../Header';
import Login from '../Login'
import VideoResults from '../VideoResults'
import { withRouter, Route } from 'react-router-dom'

class App extends Component {
    state = { email: '' }

    handleRegister = (name, surname, email, password, passswordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passswordConfirmation)
                .then(() => this.props.history.push('/login/'))
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleLogin = (email, password) => {
        try {
            logic.loginUser(email, password)
                .then(user => {
                    this.setState({ user })
                    this.props.history.push('/')
                })
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleGoToRegister = () => {
        this.props.history.push('/register/')
    }

    handleSearch = query => {
        this.props.history.push(`/search/${query}`)
    }

    handleLoginButton = () => {
        this.props.history.push('/login/')
    }

    isLoginOrRegister = () => {
        const pathname = this.props.location.pathname
        return ( 
            pathname.includes('login') || pathname.includes('register')
        )
    }

    render() {
        const {pathname} = this.props.location; 
        console.log(pathname)
        const { handleGoToRegister, handleSearch, handleLogin, handleRegister, handleLoginButton } = this
        return <section>
            {!this.isLoginOrRegister() && <Header onSearch={handleSearch} onGoToLogin={handleLoginButton} />}
            <Route path="/search/:query" render={props => <VideoResults query={props.match.params.query} />} />
            <Route path="/login/" render={() => <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />
            <Route path="/register/" render={() => <Register onRegister={handleRegister} />} />
        </section>
    }
}

export default withRouter(App)