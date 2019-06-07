import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../../logic'

import NavBar from '../NavBar'
import Landing from '../Landing'
import Register from '../Register'
import Welcome from '../Welcome'
import Login from '../Login'
import Home from '../Home'
import MapPage from '../MapPage'


class App extends Component {
    state = { lang: 'en', visible: null, error: null }

    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleRegister = (name, surname, email, password) => {
        try {
            logic.registerUser(name, surname, email, password)
                .then(() =>
                    this.props.history.push('/welcome')
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    handleLogin = (email, password) => {
        try {
            logic.loginUser(email, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(({ name }) => {
                    this.setState({ error: null }, () => this.props.history.push('/home'))
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    handleLogout = () => {
        logic.logoutUser()
        this.props.history.push('/')
    }


    render() {
        const {
            state: { lang, visible, error },
            handleRegisterNavigation,
            handleLoginNavigation,
            handleLogin,
            handleRegister,
            handleLogout
        } = this

        return <div>

            <Switch>
                <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

                <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register lang={lang} onRegister={handleRegister} error={error} />} />

                <Route path="/welcome" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Welcome lang={lang} onLogin={handleLoginNavigation} error={error} />} />

                <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login lang={lang} onLogin={handleLogin} error={error} />} />

                <Route path="/home" render={() => logic.isUserLoggedIn ? <> <NavBar lang={lang} onLogout={handleLogout} /> <Home lang={lang} /> </> : <Redirect to="/" />} />

                <Route path="/map/:id" render={() => logic.isUserLoggedIn ? <> <NavBar lang={lang} onLogout={handleLogout} /> <MapPage lang={lang} /> </> : <Redirect to="/" />} />

                <Redirect to="/" />
            </Switch>
        </div>
    }
}

export default withRouter(App)
