'use strict'

import React, { useState, useEffect, Fragment } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { AppContext } from '../AppContext'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import Home from '../Home'
import SharedSkylabers from '../SharedSkylabers'

import logic from '../../logic'

function App({ history }) {

    const [feedback, setFeedback] = useState(null)
    const [userData, setUserData] = useState({})
    const [query, setQuery] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [adSearchResults, setAdSearchResults] = useState(null)
    const [skylaber, setSkylaber] = useState(null)
    const [whiteList, setWhiteList] = useState(null)
    const [unverifiedEmails, setUnverifiedEmails] = useState(null)
    const [skylabersShared, setSkylabersShared] = useState(null)

    useEffect(() => {
        logic.isUserLoggedIn && logic.retrieveUser()
            .then(user => setUserData(user))
    }, [userData.name])

    const handleSignUp = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => {
                    setFeedback(null)
                    history.push('/')
                })
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleLogIn = (email, password) => {
        try {
            logic.logInUser(email, password)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => setFeedback(null))
                .then(() => history.push('/home'))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleRetrieveEncryptedIds = ids => {
        try {
            logic.retrieveEncryptedIds(ids)
                .then(skylabersShared => setSkylabersShared(skylabersShared))
                .then(() => setFeedback(null))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleToLogIn = () => {
        setFeedback(null)
        history.push('/')
    }

    const handleToSignUp = () => {
        setFeedback(null)
        history.push('/signup')
    }

    return (
        <Fragment>
            <AppContext.Provider value={{ feedback, setFeedback, userData, setUserData, query, setQuery, searchResults, setSearchResults, adSearchResults, setAdSearchResults, skylaber, setSkylaber, whiteList, setWhiteList, unverifiedEmails, setUnverifiedEmails }}>
                <Route exact path='/' render={() => !logic.isUserLoggedIn ? <LogIn onLogIn={handleLogIn} onToSignUp={handleToSignUp} /> : <Redirect to='/home' />} />
                <Route path='/signup' render={() => !logic.isUserLoggedIn ? <SignUp onSignUp={handleSignUp} onToLogIn={handleToLogIn} /> : <Redirect to='/home' />} />
                <Route path='/home' render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to='/' />} />
            </AppContext.Provider>
                <Route path='/skylabers/:encryptedIds' render={(props) => <SharedSkylabers encryptedIds={props.match.params.encryptedIds} retrieveEncryptedIds={handleRetrieveEncryptedIds} skylabersShared={skylabersShared}/> }/>
        </Fragment>
    )

}

export default withRouter(App)