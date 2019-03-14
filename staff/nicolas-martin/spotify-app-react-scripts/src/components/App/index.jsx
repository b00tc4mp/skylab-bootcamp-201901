'use strict'

import React, { Component } from 'react'
import LanguageSelector from '../LanguageSelector'
import Login from '../Login'
import Home from '../Home'
import i18n from '../../i18n'
import logic from '../../logic'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
    state = { selectedLanguage: 'en', loginFeedback: null, user: { email: 'e@mail.com' } }

    handleLanguageSelected = event => {
        this.setState({
            selectedLanguage: event.target.value
        })
    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password)
                .then(user => {
                    this.setState({ loginFeedback: null, user })
                })
                .catch(({ message }) => this.setState({ loginFeedback: message }))
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    render() {
        const { state: { selectedLanguage, loginFeedback, user }, handleLanguageSelected, handleLogin } = this

        const title = <h1>{i18n[selectedLanguage].title}</h1>

        return <BrowserRouter>
            <main className="app">
                <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
                {title}
                {!user && <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} feedback={loginFeedback} />}
                {user && <Home language={selectedLanguage} />}
            </main>
        </BrowserRouter>
    }
}

export default App