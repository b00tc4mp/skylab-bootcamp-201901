import React, { Fragment, useState } from 'react';
import { Route, withRouter } from 'react-router-dom'

import { GlobalContext } from './components/GlobalContext'
import Feedback from './components/Feedback'
import Spinner from './components/Spinner'

import appLogic from './logic'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

import './App.scss';

function App ({ history }) {

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
            appLogic.registerUser(email, password)
                .then(() => {
                    handleSpinner(null)
                    history.push('/home')
                })
        } catch ({ message }) {
            showSpinner(null)
            setFeedback(message)
        }
    }

    return (
        <Fragment>
            <GlobalContext.Provider value={{ feedback, setFeedback, showSpinner, handleSpinner }}>
                <Route exact path='/' component={Landing} />
                <Route exact path='/login' component={Login} onLogin={handleLogin} />
                <Route exact path='/register' component={Register} onRegister={handleRegister} />
                <Spinner />
            </GlobalContext.Provider>
            {feedback && <Feedback />}
        </Fragment>
    )
}


export default withRouter(App)
