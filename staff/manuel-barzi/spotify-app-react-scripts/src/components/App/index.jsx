'use strict'

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import LanguageSelector from '../LanguageSelector'
import Register from '../Register'
import Login from '../Login'
import Home from '../Home'
import i18n from '../../i18n'
import logic from '../../logic'
import './index.sass'

class App extends Component {
    state = { selectedLanguage: 'en', loggedIn: logic.isUserLoggedIn, loginFeedback: null, registerFeedback: null }

    handleLanguageSelected = event => {
        this.setState({
            selectedLanguage: event.target.value
        })
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
        const { state: { selectedLanguage, loginFeedback, registerFeedback }, handleLanguageSelected, handleLogin, handleRegister } = this

        const title = <h1>{i18n[selectedLanguage].title}</h1>

        return <main className="app">
            <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
            {title}
            <Route path="/register" render={() => <Register title={i18n[selectedLanguage].registerTitle} onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route path="/login" render={() => <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} feedback={loginFeedback} />} />
            {logic.isUserLoggedIn && <Route path="/" render={() => <Home language={selectedLanguage} />} />}
        </main>
    }
}

export default withRouter(App)