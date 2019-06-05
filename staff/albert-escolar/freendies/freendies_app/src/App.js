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
import ErrorPage from './components/ErrorPage'
import logic from './logic'
import feedback from './utils/feedback';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {

  state = {
    token: null,
    user: null,
    searchResults: null,
    
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
  handleLogin = async (email, password) => {

    try {
      debugger
      const token = await logic.authenticateUser(email, password)
      const user = logic.retrieveUser()
      this.setState({ token, user }, () => {
        this.props.history.push('/')
      })
		} catch (error) {
			feedback(error.message, 'error');
    }

  

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

  handleToggleFavs = (token, id) => {
    logic.toggleFavs(token, id)
  }


  render() {

    const { state: { user, searchResults }, handleRegister, handleGoToRegister, handleLogin, handleUpdateUserEmail,
      handleGoToLogin, handleGoToLanding, handleGoToUploadGame, handleGoToUserPanel,
      handleUploadGame, handleLogout, handleOnSearch, handleToSearchByGenre, handleToggleFavs, handleRetrieveFavs } = this

    return (
      <div className="App">
        <ToastContainer />
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
            return <UserPanel user={user} history={props.history} retrieveFavs={handleRetrieveFavs} onUpdateUserEmail={handleUpdateUserEmail}  />
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
            return <GameDetail {...props} user={user} retrieveFavs={handleRetrieveFavs} toggleFavs={handleToggleFavs} history={props.history} />
          }} />

          <Route path="/error" render ={props =>{
            return <ErrorPage/>
          }}/>

        </header>
      </div>
    )
  }
}

export default withRouter(App);
