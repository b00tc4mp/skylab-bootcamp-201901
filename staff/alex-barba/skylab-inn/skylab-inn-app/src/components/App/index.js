'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import {AppContext} from '../AppContext'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import Home from '../Home'

import logic from '../../logic'

function App({history}) {
    // const initialName = window.sessionStorage.getItem('userName')
    // const initialTypeOfUser = window.sessionStorage.getItem('typeOfUser')

    const [feedback, setFeedback] = useState(null)
    const [typeOfUser, setTypeOfUser] = useState(null)
    const [userName, setUserName] = useState(null)

    useEffect(() => {
        // window.sessionStorage.setItem('userName', userName)
        // window.sessionStorage.setItem('typeOfUser', typeOfUser)
        logic.isUserLoggedIn && logic.retrieveUser()
            .then(user => {
                user.techs ? setTypeOfUser('User') : setTypeOfUser('Admin')
                return setUserName(user.name)
            })
       
    }, [userName])

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
                return setUserName(user.name)
            })
            .then(() => setFeedback(null))
            .then(() => history.push('/home'))
            .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleToLogIn = () =>{
        setFeedback(null)
        history.push('/')
    }

    const handleToSignUp = () =>{
        setFeedback(null)
        history.push('/signup')
    }

    return(
    <AppContext.Provider value={{feedback, userName, typeOfUser}}>
        <Route exact path="/" render={() => !logic.isUserLoggedIn ? <LogIn onLogIn={handleLogIn} onToSignUp={handleToSignUp}/> : <Redirect to="/home"/>}/>
        <Route path="/signup" render={() => !logic.isUserLoggedIn ? <SignUp onSignUp={handleSignUp} onToLogIn={handleToLogIn}/> : <Redirect to="/home"/>}/>
        <Route path="/home" render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to="/"/>}/>
    </AppContext.Provider>
    )

}

export default withRouter(App)