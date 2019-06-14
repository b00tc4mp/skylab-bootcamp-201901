import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Register from '../Register'
import Login from '../Login'
import CanvasLanding from '../CanvasLanding'
import Home from '../Home'
import Success from '../Success'
import SuccessRegister from '../Register/SuccessRegister'
import Watch from '../Watch'
import Profile from '../Profile'
import ReadMessage from '../ReadMessage'
import FlaresMap from '../FlaresMap'
import logic from '../../logic'
import SendMessage from '../SendMessage';

class App extends Component {
  render() {
    return <main className="app">
        <Route exact path="/" render={() => <Redirect to="/landing" />} />
        <Route path="/landing" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <CanvasLanding />} />
        <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register />} />
        <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login />} />
        <Route path="/home" render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to="/landing" />} />
        <Route path="/send-message" render={() => logic.isUserLoggedIn ? <SendMessage /> : <Redirect to="/landing" />} />
        <Route path="/watch" render={() => logic.isUserLoggedIn ? <Watch /> : <Redirect to="/landing" />} />
        <Route path="/profile" render={() => logic.isUserLoggedIn ? <Profile /> : <Redirect to="/landing" />} />
        <Route path="/read-message" render={() => logic.isUserLoggedIn ? <ReadMessage /> : <Redirect to="/landing" />} />
        <Route path="/flares-map" render={() => logic.isUserLoggedIn ? <FlaresMap /> : <Redirect to="/landing" />} />
        <Route path="/success" render={() => <Success />} />
        <Route path="/success-register" render={() => <SuccessRegister />} />
    </main>
  }
}

export default App
