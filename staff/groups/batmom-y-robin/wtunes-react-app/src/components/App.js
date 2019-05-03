import React, { Component } from 'react'
import logic from '../logic'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import Profile from './Profile'
import Preferences from './Preferences'
import './App.sass'

class App extends Component {
    state = { city: null, visible: null, error: null, user: null , preferences : null }

    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then((response) => {
                    this.setState({ user: response, error: null , preferences: response.preferences})
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
    handleProfileNavigation = () => this.props.history.push('/profile')
    
    handlePreferencesNavigation = () => this.props.history.push('/preferences')
    
    handleComeBack = () => {
        logic.retrieveUser()
            .then((response) => {
                this.setState({ user: response, error: null }, () => this.props.history.push('/home'))
            })
            .catch(error =>
                this.setState({ error: error.message })
            )
        }
    
    handleCityChange = city => {

        logic.updateUserCity(city)
            .then(()=> this.setState({city}))
            .catch(error =>
            this.setState({ error: error.message })
            )
    }
    handleStyleChange = preferences =>{
        logic.updateUserPreferences(preferences)
            .then(() => this.handleComeBack())
    }

    componentDidMount() {
        logic.isUserLoggedIn &&
            logic.retrieveUser()
                .then(user =>{
                    this.setState({ user, preferences: user.preferences })
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
            state: { error, user, preferences },
            handleRegisterNavigation,
            handleLoginNavigation,
            handleCityChange,
            handleRegister,
            handleLogin,
            handleLogout,
            handleProfileNavigation,
            handlePreferencesNavigation,
            handleStyleChange,
            handleComeBack
        } = this

        return <>
                <Switch>
                    <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

                    <Route path="/register" render={()=> logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} error={error} /> }/>

                    <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} error={error} />} />

                    <Route path="/home" render={() => logic.isUserLoggedIn ? <Home onLogout={handleLogout} user={user} onProfile={handleProfileNavigation} onPreferences={handlePreferencesNavigation}/> : <Redirect to="/" />} />

                    {user && <Route path="/profile" render={() => <Profile user={user} onReturn={handleComeBack} onCityChange={handleCityChange}/> } />}
                    
                    {user && <Route path="/preferences" render={() => <Preferences  preferences={preferences} onStyleChange={handleStyleChange}/>} />}

                <Redirect to="/" />
                </Switch>
        </>
    }
}

export default withRouter(App)