import React, { Component } from 'react'
import logic from '../logic'
//import CitySelector from './CitySelector'
import Landing from './Landing'
//import Register from './Register'
import Login from './Login'
//import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

class App extends Component {
    state = { city: null, visible: null, error: null, name: null }

    //handleCityChange = city => this.setState({ city: selectedCity})

    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(({ name }) => {
                    this.setState({ name, error: null })
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    componentDidMount() {
        // logic.isUserLoggedIn &&
        //     logic.retrieveUser()
        //         .then(user =>
        //             this.setState({ name: user.name })
        //         )
        //         .catch(error =>
        //             this.setState({ error: error.message })
        //         )
    }

    // handleRegister = (name, surname, username, password) => {
    //     try {
    //         logic.registerUser(name, surname, username, password)
    //             .then(() =>
    //                 this.setState({ visible: 'register-ok', error: null })
    //             )
    //             .catch(error =>
    //                 this.setState({ error: error.message })
    //             )
    //     } catch ({ message }) {
    //         this.setState({ error: message })
    //     }
    // }

    // handleLogout = () => {
    //     logic.logoutUser()

    //     this.props.history.push('/')
    // }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) this.setState({ visible: null })
    }

    render() {
        const {
            state: {  city, visible, error, name },
            // handleCityChange,
            handleRegisterNavigation,
            handleLoginNavigation,
            handleLogin,
            // handleRegister,
            // handleLogout
        } = this

        return <>
                <Switch>
                    <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

                    {/* <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> :
                        visible !== 'register-ok' ?
                        <Register lang={lang} onRegister={handleRegister} error={error} /> :
                        <RegisterOk lang={lang} onLogin={handleLoginNavigation} />
                    } /> */}

                    <Route path="/login" render={() => logic.isUserLoggedIn ? console.log('HOME REDIRECT') : <Login onLogin={handleLogin} error={error} />} />

                    {/* <Route path="/home" render={() => logic.isUserLoggedIn ? <Home lang={lang} name={name} onLogout={handleLogout} /> : <Redirect to="/" />} /> */}

                <Redirect to="/" />
                </Switch>
        </>
    }
}

export default withRouter(App)