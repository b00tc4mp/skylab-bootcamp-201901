import React, { Component } from 'react'
import logic from '../logic'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Register from './Register'
import RegisterOk from './RegisterOk'
import Login from './Login'
import Home from './Home'

class App extends Component {
    state = { lang: i18n.language, visible: logic.isUserLoggedIn ? 'home' : 'landing', error: null, name: null }

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang }) // NOTE setter runs first, getter runs after (i18n)

    handleRegisterNavigation = () => this.setState({ visible: 'register' })

    handleLoginNavigation = () => this.setState({ visible: 'login' })

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(user => {
                    this.setState({ visible: 'home', name: user.name, error: null })
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    componentDidMount() {
        logic.isUserLoggedIn &&
            logic.retrieveUser()
                .then(user =>
                    this.setState({ name: user.name })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
    }

    handleRegister = (name, surname, username, password) => {
        try {
            logic.registerUser(name, surname, username, password)
                .then(() =>
                    this.setState({ visible: 'register-ok', error: null })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout = () => {
        logic.logoutUser()

        this.setState({ visible: 'landing' })
    }

    render() {
        const {
            state: { lang, visible, error, name },
            handleLanguageChange,
            handleRegisterNavigation,
            handleLoginNavigation,
            handleLogin,
            handleRegister,
            handleLogout
        } = this

        // return <Fragment>
        return <>
            <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />

            {visible === 'landing' && <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />}

            {visible === 'register' && <Register lang={lang} onRegister={handleRegister} error={error} />}

            {visible === 'register-ok' && <RegisterOk lang={lang} onLogin={handleLoginNavigation} />}

            {visible === 'login' && <Login lang={lang} onLogin={handleLogin} error={error} />}

            {visible === 'home' && <Home lang={lang} name={name} onLogout={handleLogout} />}
        </>
        // </Fragment>
    }
}

export default App