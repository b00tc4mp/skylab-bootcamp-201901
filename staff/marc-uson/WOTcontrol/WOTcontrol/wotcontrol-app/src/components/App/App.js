import React, { useState } from "react"
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { Context } from "../Context"
import logic from '../../logic'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import './App.sass'

function App(props) {
    const [isLogedIn, setIsLogedIn] = useState('')
    const [error, setError] = useState('')

    const handleRegisterNavigation = () => props.history.push('/register')

    const handleLoginNavigation = () => props.history.push('/login')

    const handleRegister = async (name, surname, email, password) => {
        try {
            await logic.registerUser(name, surname, email, password)
            setError(null)
            props.history.push('/login')
        } catch (error) {
            setError(error.message)
        }
    }

    const handleLogin = async (email, password) => {
        try {
            await logic.loginUser(email, password)
            setError(null)
            props.history.push('/Home')
        } catch (error) {
            setError(error.message)
        }
    }

    const handleLogout = () => {
        logic.logoutUser()
        props.history.push('/')
    }

    return (
        <Context.Provider value={{ isLogedIn, setIsLogedIn, error, setError }}>
            <Switch>
                <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />
                <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} navigateToLogin={handleLoginNavigation} />} />
                <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} navigateToRegister={handleRegisterNavigation}/>} />
                <Route path="/home" render={() => logic.isUserLoggedIn ? <Home onLogout={handleLogout} /> : <Redirect to ="/" /> }/>

                <Redirect to="/" />
            </Switch>
        </Context.Provider >
    )
}

export default withRouter(App)