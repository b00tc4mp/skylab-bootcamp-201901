'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { AppContext } from '../AppContext'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import Home from '../Home'

import logic from '../../logic'

function App({ history }) {

    const [feedback, setFeedback] = useState(null)
    const [typeOfUser, setTypeOfUser] = useState(null)
    const [userData, setUserData] = useState({})
    const [query, setQuery] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [adSearchResults, setAdSearchResults] = useState(null)
    const [skylaber, setSkylaber] = useState(null)

    useEffect(() => {
        logic.isUserLoggedIn && logic.retrieveUser()
            .then(user => {
                user.technology ? setTypeOfUser('User') : setTypeOfUser('Admin')
                return setUserData(user)
            })

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
                .then(user => {
                    user.techs ? setTypeOfUser('User') : setTypeOfUser('Admin')
                    return setUserData(user)
                })
                .then(() => setFeedback(null))
                .then(() => history.push('/home'))
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
        <AppContext.Provider value={{ feedback, setFeedback, typeOfUser, userData, setUserData, query, setQuery, searchResults, setSearchResults, adSearchResults, setAdSearchResults, skylaber, setSkylaber }}>
            <Route exact path="/" render={() => !logic.isUserLoggedIn ? <LogIn onLogIn={handleLogIn} onToSignUp={handleToSignUp} /> : <Redirect to="/home" />} />
            <Route path="/signup" render={() => !logic.isUserLoggedIn ? <SignUp onSignUp={handleSignUp} onToLogIn={handleToLogIn} /> : <Redirect to="/home" />} />
            <Route path="/home" render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to="/" />} />
        </AppContext.Provider>
    )

}

export default withRouter(App)