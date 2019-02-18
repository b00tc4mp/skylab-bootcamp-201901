import React, { Component } from 'react';
import Home from '../Home'
import Welcome from '../Welcome'
import logic from '../../logic'
import './index.sass'
import { HashRouter, Route, Redirect } from 'react-router-dom'

class App extends Component {

  handleLogout = () => {
    logic.logout()

    this.props.history.push('/')
}

  render() {

    return <HashRouter>
            <main className="app">
                {<Route path="/home" render={() =>  logic.userLoggedIn ? <Home onLogout={this.handleLogout} /> : <Redirect to="/" />} />}
                {<Route exactpath="/" render={() =>  logic.userLoggedIn ? <Redirect to="/home" /> : <Welcome/>} />}
            </main>
        </HashRouter>
  }
}

export default App
