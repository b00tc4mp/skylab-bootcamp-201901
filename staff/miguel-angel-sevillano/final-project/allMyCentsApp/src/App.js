import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect, Link } from "react-router-dom";
import mainLogo from '../src/images/logo.png'
import secondLogo from '../src/images/secondLogo.png'
import mainTitle from '../src/images/mainTitlev2.png'
import coin from '../src/images/coin.png'
import Register from './components/Register'
import Login from './components/Login'
import logic from './logic/index'
import Home from './components/Home'
import UserContext from './components/UserContext'
import './index.sass'
import { Modal } from './components/Modal'



function App(props) {


  const [activateModal, setActivateModal] = useState(false)

  const [messageReg, isRegistered] = useState(null)
  const [registerOk, setRegOk] = useState(null)

  const [messageLog, isLogin] = useState(null)
  const [loggedOk, setLogOk] = useState(null)

  const [userName, setName] = useState(null)

  let [checkedAlerts, setCheckedAlerts] = useState(null)





  function returnLanding() {
    isRegistered(null)
    isLogin(null)
    setActivateModal(false)
    props.history.push("/")
  }

  function setModal() {
    debugger
    setActivateModal(true)
  }

  function closeModal() {
    setActivateModal(false)

  }


  function handleRegister(name, surname, email, password) {

    return (async () => {

      try {
        const response = await logic.register(name, surname, email, password)
        props.history.push("/Login")
      }
      catch (error) {
        isRegistered(error.message)
      }
    })()

  }

  function handleLogin(email, password) {
    setActivateModal(false)
    return (async () => {
      isLogin(false)

      try {

        const response = await logic.logIn(email, password)
        sessionStorage.setItem('token', response.token)
        const { name } = await logic.retrieveUser(response.token)
        const areAlerts = await logic.getAlertOverload(sessionStorage.token)
        if (areAlerts) setCheckedAlerts(areAlerts)
        setName(name)
        setLogOk(true)
      }
      catch (error) {
        isLogin(error.message)
      }
    })()

  }





  return <Switch>

    <UserContext.Provider value={{ loggedOk, registerOk, setLogOk, setRegOk, userName }}>

      <Route exact path="/" render={() =>
        sessionStorage.token ? <Redirect to="/Home" /> :
        <div class="landingBody">
          <span class="titleLogo">
            <img src={mainTitle} className="mainTitle"  ></img>
            <container className="coinContainer">
              <img src={coin} className="coin"  ></img>
            </container>
            <a onClick={setModal}>
              <img src={mainLogo} className="mainLogo" ></img>
            </a>
          </span>
          <div>
            {activateModal && <Modal onClose={closeModal} >
              <div class="modalBody" >
                <div>
                  <img class="selectLogo" src={mainLogo}  ></img>
                </div>
                <div class="landingButtons">
                  <Link class="button is-link" id="link" to={'/Register'} onClick={closeModal}>Register</Link>
                  <Link class="button is-primary" id="link" to={'/Login'} onclick={closeModal}>Login</Link>
                </div>
              </div>
            </Modal>}
          </div>
        </div>

      } />
      <Route exact path="/Register" render={() =>
        registerOk ? <Redirect to="/Login" /> :
          <div class="registerBody">
            <span class="titleLogo">
              <img src={mainTitle} className="mainTitle"  ></img>
            </span>
            <div>
              <Register onRegister={handleRegister} message={messageReg} cancel={returnLanding} />
            </div>
          </div>} />

      <Route exact path="/Login" render={() =>
        loggedOk ? <Redirect to="/Home" /> :
          <div class="loginBody">
            <span class="titleLogo">
              <img src={mainTitle} className="mainTitle"  ></img>
            </span>
            <div>
              <Login class="appBody" onLogin={handleLogin} message={messageLog} cancel={returnLanding} />
            </div>
          </div>} />

      <div class="home">
        <Route path="/Home" render={() =>
          !sessionStorage.token ? <Redirect to="/" /> :
            <div class="home">
              <Home checkAlerts={checkedAlerts} />
            </div>} />
      </div>

    </UserContext.Provider>


  </Switch>

}

export default withRouter(App)
