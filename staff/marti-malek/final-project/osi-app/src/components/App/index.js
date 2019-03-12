import React, { useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass';
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Desktop from '../Desktop'
import logic from '../../logic';

function App({ history, handleGoToLogin, handleGoToRegister, handleLogin, handleRegister }) {

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
  }

  handleRegister = (name, surname, email, password, passwordConfirm) => {
    logic.register(name, surname, email, password, passwordConfirm)
      .then(() => history.push('/login'))
  }

  return <main className="App">
    <Route exact path="/" render={() => <Landing goToLogin={handleGoToLogin} goToRegister={handleGoToRegister} />}></Route>
    <Route path="/login" render={() => <Login onLogin={handleLogin} goToRegister={handleGoToRegister}/>}></Route>
    <Route path="/register" render={() => <Register onRegister={handleRegister} goToLogin={handleGoToLogin}/>}></Route>
    <Route path="/desktop" render={() => logic.isUserLoggedIn ? <Desktop /> : <Redirect to="/"/>}></Route>
  </main>
}

export default withRouter(App);
