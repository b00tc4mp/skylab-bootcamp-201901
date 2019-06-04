import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import RegisterPanel from './components/RegisterPanel'
import LoginPanel from './components/LoginPanel'
import UserPanel from './components/UserPanel'
import UploadGamePanel from './components/UploadGamePanel'
import Landing from './components/Landing'
import SearchByQuery from './components/SearchByQuery'
import SearchByGenre from './components/SearchByGenre'
import GameDetail from './components/GameDetail'
import logic from './logic'

class App extends Component {

  state = {
    token: null,
    user: null,
    searchResults: null,
    // favoriteGames: null,
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

  handleUpdateUserEmail = (email) => {
    return logic.updateUserEmail(email)

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

  handleGoToUserPanel = () => {
    this.props.history.push('/user')
  }

  handleOnSearch = (genre, title) => {
    this.props.history.push(`/search/${genre}/${title}`)

  }

  handleToSearchByGenre = (genre) => {
    this.props.history.push(`/genres/${genre}`)
  }

 
  render() {

    const { state: { user, searchResults }, handleRegister, handleGoToRegister, handleLogin, handleUpdateUserEmail,
      handleGoToLogin, handleGoToLanding, handleGoToUploadGame, handleGoToUserPanel,
      handleUploadGame, handleLogout, handleOnSearch, handleToSearchByGenre} = this

    return (
      <div className="App">
        <header className="App-header">
          <Route path="/" render={() => <Header onSearch={handleOnSearch} onSearchByGenre={handleToSearchByGenre} user={user} handleGoToRegister={handleGoToRegister} handleGoToLogin={handleGoToLogin}
            handleGoToLanding={handleGoToLanding} handleLogout={handleLogout} handleGoToUserPanel={handleGoToUserPanel}
            handleGoToUploadGame={handleGoToUploadGame} searchResults={searchResults} />} />

          <Route exact path="/" render={props => {
            return <div>
              <Landing user={user} searchResults={searchResults} history={props.history} />

            </div>
          }} />

          <Route path="/register" render={props => {
            return <RegisterPanel history={props.history} onRegister={handleRegister} />
          }} />

          <Route path="/login" render={props => {
            return <LoginPanel history={props.history} onLogin={handleLogin} />
          }} />

          <Route path="/user" render={props => {
            return <UserPanel history={props.history} onUpdateUserEmail={handleUpdateUserEmail} user={user} />
          }} />

          <Route path="/uploadGame" render={props => {
            return <UploadGamePanel history={props.history} onUploadGame={handleUploadGame} />
          }} />
          <Route path="/genres/:genre" render={props => {
            return <SearchByGenre {...props} history={props.history} />
          }} />
          <Route path="/search/:genre/:query" render={props => {

            return <SearchByQuery {...props} history={props.history} />
          }} />

          <Route path="/game/:id" render={props => {
            return <GameDetail {...props} user={user} history={props.history}/>
          }} />


        </header>
      </div>
    )
  }
}

export default withRouter(App);
