import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import RegisterPanel from './components/RegisterPanel'
import LoginPanel from './components/LoginPanel'
import UploadGamePanel from './components/UploadGamePanel'
import logic from './logic'

class App extends Component {

  onRegister = (username, email, password, passwordConfirmation) => {
    const { history } = this.props

    logic.registerUser(username, email, password, passwordConfirmation)
      .then(() => history.push('/login'))
  }

  onLogin = (email, password) => {
    const { history } = this.props

    logic.authenticateUser(email, password)
      .then(() => history.push('/'))
  }

  onUploadGame = (title, genre, description, images, gameFile) => {
    const { history } = this.props

    logic.uploadGame(title, genre, description, images, gameFile)
      .then(() => history.push('/'))
  }

  render() {

    const { onRegister, onLogin, onUploadGame } = this

    return (
      <div className="App">
        <header className="App-header">
          <Switch>

            <Route exact path="/" render={props => {

              return <button onClick={() => props.history.push("/register")}>Register</button>

            }} />


            <Route path="/register" render={props => {

              return <RegisterPanel history={props.history} onRegister={onRegister} />

            }} />

            <Route path="/login" render={props => {
              return <LoginPanel history={props.history} onLogin={onLogin} />
            }} />


            <Route path="/uploadGame" render={props => {
              return <UploadGamePanel history={props.history} onUploadGame={onUploadGame} />
            }} />

          </Switch>

        </header>
      </div>
    )
  }
}

export default App;
