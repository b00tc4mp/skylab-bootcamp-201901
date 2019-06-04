import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect, Link } from "react-router-dom";
import './App.css';
import logo from '../src/logo.png'
import Register from './components/Register'
import Login from './components/Login'
import logic from './logic/index'
import Home from './components/Home'
import UserContext from './components/UserContext'



function App(props) {

  const [messageReg, isRegistered] = useState(null)
  const [registerOk, setRegOk] = useState(null)

  const [messageLog, isLogin] = useState(null)
  const [loggedOk, setLogOk] = useState(null)

  const [userName, setName] = useState(null)


  function returnLanding() {
    props.history.push("/")
  }



  function handleRegister(name, surname, email, password) {

    return (async () => {

      try {
        const response = await logic.register(name, surname, email, password)
        if (response.message === "Ok,user Registerd") {

          isRegistered(response.message)
          props.history.push("/Login")
        } else isRegistered(response.message)
      }
      catch (error) {
        isRegistered(error.message)
      }
    })()

  }

  function handleLogin(email, password) {

    return (async () => {

      try {
        const response = await logic.logIn(email, password)
        if (response.token) {
          setLogOk(true)
          const { name } = await logic.retrieveUser(response.token)
          setName(name)
          sessionStorage.setItem('token', response.token)
          props.history.push("/Home")
        }
        else return isLogin(response)
      }
      catch (error) {
        isLogin(error.message)
      }
    })()

  }





  return <Switch>

    <UserContext.Provider value={{ loggedOk, registerOk, setLogOk, setRegOk, userName }}>
      <Route>

        <Route exact path="/" render={() =>
        
          <div>
             <img src={logo} ></img>
            <Link className="button is-link" to={'/Register'}>Register</Link>
            <Link className="button is-link" to={'/Login'}>Login</Link>
          </div>} />

        <Route exact path="/Register" render={() =>
          registerOk ? <Redirect to="/Login" /> :
            <div>
               <img src={logo} ></img>
              <Register onRegister={handleRegister} message={messageReg} cancel={returnLanding} />
            </div>} />


        <Route exact path="/Login" render={() =>
          loggedOk ? <Redirect to="/Home" /> :
            <div>
               <img src={logo} ></img>
              <Login onLogin={handleLogin} message={messageLog} cancel={returnLanding} />
            </div>} />


       </Route>
       
        <Route path="/Home" render={() =>
          !loggedOk ? <Redirect to="/" /> :
            <div>
              <Home />
            </div>} />



    </UserContext.Provider>


  </Switch>

}

export default withRouter(App)
