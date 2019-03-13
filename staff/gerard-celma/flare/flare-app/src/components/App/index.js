import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Register from '../Register'
import Login from '../Login'
import Home from '../Home'
import Success from '../Success'
import Fail from '../Fail'
import Watch from '../Watch'
import Profile from '../Profile'
import ReadMessage from '../ReadMessage'
import FlaresMap from '../FlaresMap'
import logic from '../../logic'
import SendMessage from '../SendMessage';

class App extends Component {
  render() {
    return <main className="app">
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/home" render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to="/login" />} />
        <Route path="/send-message" render={() => <SendMessage />} />
        <Route path="/watch" render={() => <Watch />} />
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/read-message" render={() => <ReadMessage />} />
        <Route path="/flares-map" render={() => <FlaresMap />} />
        <Route path="/success" render={() => <Success />} />
        <Route path="/fail" render={() => <Fail />} />
    </main>
  }
}

export default App
