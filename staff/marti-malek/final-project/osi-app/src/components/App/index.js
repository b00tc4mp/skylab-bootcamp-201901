import React, { useEffect, useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass';
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Desktop from '../Desktop'
import logic from '../../logic';

function App({ history, handleGoToLogin, handleGoToRegister, handleLogin, handleRegister, handleLogout }) {

  let [logged, setLogged] = useState(true)

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
  }

  handleRegister = (name, surname, email, password, passwordConfirm) => {
    logic.register(name, surname, email, password, passwordConfirm)
      .then(() => history.push('/login'))
  }

  handleLogout = async() => {
    await logic.logOutUser()
    logged = false
    setLogged(false)
  }

  return <main className="App">
    <Route exact path="/" render={() => !logic.isUserLoggedIn ? <Landing goToLogin={handleGoToLogin} goToRegister={handleGoToRegister} />: <Redirect to="/desktop"/>}></Route>
    <Route path="/login" render={() => !logic.isUserLoggedIn ? <Login onLogin={handleLogin} goToRegister={handleGoToRegister}/> : <Redirect to="/desktop"/>}></Route>
    <Route path="/register" render={() => !logic.isUserLoggedIn ? <Register onRegister={handleRegister} goToLogin={handleGoToLogin}/>: <Redirect to="/desktop"/>}></Route>
    <Route path="/desktop" render={() => logic.isUserLoggedIn ? <Desktop handleLogout={handleLogout}/> : <Redirect to="/"/>}></Route>
  </main>
}

export default withRouter(App);
