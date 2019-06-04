import React, { useState, useEffect, Fragment } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import Landing from '../Landing'
import Home from '../Home'

import logic from '../../logic'

function App({ history }) {

  const [feedback, setFeedback] = useState(null)
  const [userData, setUserData] = useState({})
  const [query, setQuery] = useState(null)

  useEffect(() => {
    logic.isUserLoggedIn && logic.retrieveUser()
      .then(user => setUserData(user))
  }, [userData.name])

  const handleSignUp = (name, surname, email, password, passwordConfirmation) => {
    try {
      logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => {
          history.push('/login')
        })
        .catch(({ message }) => {
          setFeedback(message)
        })
    } catch ({ message }) {
      setFeedback(message)
    }
  }

  const handleLogIn = (nicknameOEmail, password) => {
    try {
      console.log("hello")
      logic.loginUser(nicknameOEmail, password)
        .then(() => logic.retrieveUser())
        .then(user => setUserData(user))
        .then(() => {
          console.log("hello to")
          setFeedback(null)
        })
        .then(() => history.push('/home'))
        .catch(({ message }) => {
          setFeedback(message)
        })
    } catch ({ message }) {
      setFeedback(message)
    }
  }

  const handleToLogin = () => {
    setFeedback(null)
    history.push('/login')
  }

  const handleToRegister = () => {
    setFeedback(null)
    history.push('/register')
  }

  return (
    <Fragment>
      <Route exact path='/' render={() => !logic.isUserLoggedIn ? <Landing toLogin={handleToLogin} toRegister={handleToRegister} /> : <Redirect to='/home' />} />
      <Route path='/login' render={() => !logic.isUserLoggedIn ? <Login onLogin={handleLogIn} /> : <Redirect to='/home' />} />
      <Route path='/register' render={() => !logic.isUserLoggedIn ? <Register onSignUp={handleSignUp} /> : <Redirect to='/home' />} />
      <Route path='/home' render={() => logic.isUserLoggedIn ? <Home/> : <Redirect to='/' />} />
    </Fragment>
  )

}

export default withRouter(App)