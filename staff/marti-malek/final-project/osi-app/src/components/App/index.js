import React, { useEffect, useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass';
import Feedback from '../Feedback'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Desktop from '../Desktop'
import logic from '../../logic';

function App({ history, handleGoToLogin, handleGoToRegister, handleLogin, handleRegister, handleLogout, closeFeedback }) {

  let [logged, setLogged] = useState(true)
  let [feedback, setFeedback] = useState(null)
  let [feedbackError, setFeedbackError] = useState(null)
  let [feedbackMessage, setFeedbackMessage] = useState(null)

  useEffect(() => {
  }, [logged])

  handleGoToLogin = () => {
    history.push('/login')
  }

  handleGoToRegister = () => {
    history.push('/register')
  }

  handleLogin = (email, password) => {
    logic.login(email, password)
      .then(token => {
        logic.__userApiToken__ = token
        return logic.createRootDir()
      })
      .then(() => history.push('/desktop'))
      .catch((err) => {
        setFeedback(true)
        setFeedbackError(err)
      })
  }

  handleRegister = (name, surname, email, password, passwordConfirm) => {
    logic.register(name, surname, email, password, passwordConfirm)
      .then(() => history.push('/login'))
      .catch((err) => {
        setFeedback(true)
        setFeedbackError(err)
      })
  }

  handleLogout = async () => {
    await logic.logOutUser()
    logged = false
    setLogged(false)
  }

  closeFeedback = () => {
    setFeedback(false)
    setFeedbackError(null)
    setFeedbackMessage(null)
  }

  return <main className="App">
    {
      feedback && <Feedback actualError={feedbackError} actualMessage={feedbackMessage} closeFeedback={closeFeedback}></Feedback>
    }
    <Route exact path="/" render={() => !logic.isUserLoggedIn ? <Landing goToLogin={handleGoToLogin} goToRegister={handleGoToRegister} /> : <Redirect to="/desktop" />}></Route>
    <Route path="/login" render={() => !logic.isUserLoggedIn ? <Login onLogin={handleLogin} goToRegister={handleGoToRegister} /> : <Redirect to="/desktop" />}></Route>
    <Route path="/register" render={() => !logic.isUserLoggedIn ? <Register onRegister={handleRegister} goToLogin={handleGoToLogin} /> : <Redirect to="/desktop" />}></Route>
    <Route path="/desktop" render={() => logic.isUserLoggedIn ? <Desktop handleLogout={handleLogout} /> : <Redirect to="/" />}></Route>
  </main>
}

export default withRouter(App);
