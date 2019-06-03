import React, { useState } from "react"
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { Context } from "../Context"
//import logic from '../logic'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
//import Home from '../Home'
import './App.sass'

function App(props) {
    const [isLogedIn, setIsLogedIn] = useState('')
    const [error, setError] = useState('')

    const handleRegisterNavigation = () => props.history.push('/register')

    const handleLoginNavigation = () => props.history.push('/login')

    return (
        <Context.Provider value={{ isLogedIn, setIsLogedIn, error, setError }}>
            <Switch>
                <Route exact path="/" render={() => <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />
                {/* <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} /> */}
                <Route path="/register" render={() => <Register />} />
                {/* <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} error={error} />} /> */}
                <Route path="/login" render={() => <Login />} />
                {/* <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} error={error} />} /> */}

                <Redirect to="/" />
            </Switch>
        </Context.Provider >
    )
}

export default withRouter(App)