import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import RegisterPanel from './components/RegisterPanel'
import LoginPanel from './components/LoginPanel'
import UploadGamePanel from './components/UploadGamePanel'
import logic from './logic'

class App extends Component {

  state = {
    token: null,
    user: null,
    // userFavs: null,
    // userUploads: null,
  }

  componentDidMount() {
    const { token } = this.props
    if (logic.getUserApiToken() || token)
      logic.retrieveUser(token)
        .then(user => {

          this.setState({ user, token })

        })
  }

  handleRegister = (username, email, password, passwordConfirmation) => {
    const { history } = this.props
    logic.registerUser(username, email, password, passwordConfirmation)
      .then((res) => history.push('/login'))
  }
  handleLogin = (email, password) => {


    return logic.authenticateUser(email, password)
      .then((token) => {
        this.setState({ token })
        return logic.retrieveUser()
          .then(user => this.setState({ user }))
          .then(() => this.props.history.push('/'))
      })

  }

  handleGoToRegister = () => {
    this.props.history.push('/register')
  }

  handleGoToLogin = () => {
    this.props.history.push('/login')
  }

  handleGoToLanding = () => {
    this.props.history.push('/')
  }

  handleGoToUploadGame = () => {
    this.props.history.push('/uploadGame')
  }


  handleUploadGame = (title, genre, description, images, gameFile) => {
    const { history } = this.props

    logic.uploadGame(title, genre, description, images, gameFile)
      .then(() => history.push('/'))
  }

  handleLogout = () => {
    this.setState({ user: null, token: null })
    logic.deleteUserApiToken()
  }
  render() {

    const { state: { user }, handleRegister, handleGoToRegister, handleLogin, handleGoToLogin, handleGoToLanding, handleGoToUploadGame, handleUploadGame, handleLogout } = this

    return (
      <div className="App">
        <header className="App-header">
          <Header user={user} handleGoToRegister={handleGoToRegister} handleGoToLogin={handleGoToLogin}
            handleGoToLanding={handleGoToLanding} handleLogout={handleLogout}
            handleGoToUploadGame={handleGoToUploadGame}></Header>
          <Switch>

            <Route exact path="/" render={props => {

              return <div>
                <h1>Landing</h1>
                {!user && <h2>Welcome to Freendies</h2>}
                {user && <h2>Welcome to Freendies {user.username}</h2>}
              </div>


            }} />


            <Route path="/register" render={props => {

              return <RegisterPanel history={props.history} onRegister={handleRegister} />

            }} />

            <Route path="/login" render={props => {
              return <LoginPanel history={props.history} onLogin={handleLogin} />
            }} />


            <Route path="/uploadGame" render={props => {
              return <UploadGamePanel history={props.history} onUploadGame={handleUploadGame} />
            }} />

          </Switch>

        </header>
      </div>
    )
  }
}

export default withRouter(App);
