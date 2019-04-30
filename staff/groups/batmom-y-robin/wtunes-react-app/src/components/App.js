import React, { Component } from 'react'
import logic from '../logic'
//import CitySelector from './CitySelector'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

class App extends Component {
    state = { city: null, visible: null, error: null, user: null }

    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then((response) => {
                    this.setState({ user: response, error: null })
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleRegister = (name, surname, username, password, city) => {
        try {
            logic.registerUser(name, surname, username, password, city)
            .then(() =>

            this.setState({ name, error: null }, () => this.props.history.push('/login'))
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

        this.props.history.push('/')
    }

    componentDidMount() {
        logic.isUserLoggedIn &&
            logic.retrieveUser()
                .then(user =>{
                    this.setState({ user })
                }
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
    }
    // componentDidUpdate(prevProps) {
    //     if (this.props.location !== prevProps.location) this.setState({ visible: null })
    // }

    render() {
        const {
            state: {  visible, error, user },
            handleRegisterNavigation,
            handleLoginNavigation,
            handleCityChange,
            handleRegister,
            handleLogin,
            handleLogout
        } = this

        return <>
                <Switch>
                    <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

                    <Route path="/register" render={()=> logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onCityChange={handleCityChange}error={error} city/> }/>

                    <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} error={error} />} />

                    <Route path="/home" render={() => logic.isUserLoggedIn ? <Home onLogout={handleLogout} user={user} /> : <Redirect to="/" />} />

                <Redirect to="/" />
                </Switch>
        </>
    }
}

export default withRouter(App)