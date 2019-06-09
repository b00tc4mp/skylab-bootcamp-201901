import React, { Fragment, useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import { GlobalContext } from './components/GlobalContext'

import appLogic from './logic'

import Feedback from './components/Feedback'
import Spinner from './components/Spinner'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import './App.scss'

function App ({ history }) {

    const [ locate, setLocate ] = useState(null)
    const [ feedback, setFeedback ] = useState(null)
    const [ showSpinner, handleSpinner ] = useState(null)

    const handleRegister = (name, email, password) => {
        handleSpinner(true)

        try {
            appLogic.registerUser(name, email, password)
                .then(() => {
                    handleSpinner(null)
                    history.push('/')
                })
        } catch ({ message }) {
            handleSpinner(null)
            setFeedback(message)
        }
    }

    const handleLogin = (email, password) => {
        handleSpinner(true)

        try{
            appLogic.loginUser(email, password)
                .then(() => {
                    handleSpinner(null)
                    history.push('/home')
                })
        } catch ({ message }) {
            handleSpinner(null)
            setFeedback(message)
        }
    }

    const setCurrentPosition = () => {
        try{
            appLogic.handleInitialLocation()
                .then(res => {
                    setLocate(res.reverse())
                })
        } catch ({ message }) {
            console.log(message)
        }
    }

    useEffect(() => {
        setCurrentPosition()
    },[])

    return (
        <Fragment>
            <GlobalContext.Provider value={{ feedback, setFeedback, showSpinner, handleSpinner }}>
                <Spinner />
                <Route exact path='/' render={() => !appLogic.isUserLoggedIn ? <Landing  locate={locate} /> : <Redirect to="/home" /> } />
                <Route exact path='/login' render={() => appLogic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} locate={locate} />} />
                <Route exact path='/register' render={() => appLogic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} locate={locate} />} />
                <Route exact path='/home' render={() => !appLogic.isUserLoggedIn ? <Redirect to="/" /> : <Home locate={locate} />} />
            </GlobalContext.Provider>
            {feedback && <Feedback />}
        </Fragment>
    )
}

export default withRouter(App)
