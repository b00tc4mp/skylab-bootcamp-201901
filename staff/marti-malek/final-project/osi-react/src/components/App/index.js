import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom'
import './index.sass';
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'

function App({ history, handleGoToLogin, handleGoToRegister, handleLogin, handleRegister }) {

  handleGoToLogin = () => {
    history.push('/login')

  }

  handleGoToRegister = () => {
    history.push('/register')
  }

  handleLogin = (email, password) => {
    console.log(email, password)
  }

  handleRegister = (name, surname, email, password, passwordConfirm) => {
    console.log(name, surname, email, password, passwordConfirm)
  }

  return <main className="App">
    <Route exact path="/" render={() => <Landing goToLogin={handleGoToLogin} goToRegister={handleGoToRegister} />}></Route>
    <Route path="/login" render={() => <Login onLogin={handleLogin} />}></Route>
    <Route path="/register" render={() => <Register onRegister={handleRegister} />}></Route>
  </main>
}

export default withRouter(App);
