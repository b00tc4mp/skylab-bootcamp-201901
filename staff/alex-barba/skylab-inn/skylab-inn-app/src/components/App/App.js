'use strict'

import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import {AppContext} from '../AppContext'

import logic from '../../logic'

function App({history, feedback, userName}) {
    const [feedback, setFeedback] = useState(null)
    const [typeOfUser, setTypeOfUser] = useState(null)
    const [userName, setUserName] = useState(null)

    handleRegistration = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => history.push('/'))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    return(
    <AppContext.Provider value={{userName, feedback}}>
        <Route path="/" render={() => <Login />}/>
        <Route path="/signup" render={() => <SignUp onRegistration={handleRegistration}/>}/>
        <Route path="/home" render={() => logic.isUserLoggedIn ? <Redirect to="/"/> : <Home />}/>
    </AppContext.Provider>
    )

}

export default withRouter(App)