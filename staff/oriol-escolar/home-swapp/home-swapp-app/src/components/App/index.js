import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import logo from '../../logo.svg';
import './index.sass';
import Login from '../loginPanel'
import Register from '../registerPanel'
import MyHouses from '../myHouses'
import Favorites from '../favorites'
import LandingPage from '../LandingPage'
import Header from '../Header'
import SearchResults from '../searchResults'
import logic from '../../logic'


class App extends Component {
  state = {
    token: "",
    user: "",
    userFavs: "",
    userHouses: "",
    loginFeedback: null,
    registerFeedback: null,
    registered: ""


  }
  componentDidMount() {
    logic.getUserApiToken() && logic.retrieveUser()
      .then(user => {
        
        this.setState({ user })
        



      })
      .then(() => this.userInfoRetriever())


      
  }

  async userInfoRetriever() {
    // const user = await logic.registerUser()
    const userFavs = await logic.retrieveFavorites()
    const userHouses = await  logic.retrieveMyHouses()
    this.setState({ userFavs, userHouses })
  }

  async updateUser(){

    const user = await logic.retrieveUser()
    const userFavs = await logic.retrieveFavorites()
    const userHouses = await  logic.retrieveMyHouses()
    this.setState({user,userFavs, userHouses})


  }


  handleLogin = (email, password) => {

    try {
      return logic.loginUser(email, password)
        .then((token) => {

          this.setState({ token })
          return logic.retrieveUser()
            .then(user => this.setState({ user }))
            .catch(({ message }) => {
              this.setState({ loginFeedback: message })
            })
            .then(() => this.props.history.push('/'))
        })
        .catch(({ message }) => {
          this.setState({ loginFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ loginFeedback: message })
    }
  }

  handleRegister = (username, email, password, passwordConfirm) => {

    try {
      return logic.registerUser(username, email, password, passwordConfirm)
        .then(() => {

          this.setState({ registered: 'yes' })
          this.props.history.push('/login')



        })
        .catch(({ message }) => {
          this.setState({ registerFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ registerFeedback: message })
    }
  }

  //#region  Header Functions 


  handleGoToLogout = () => {
    logic.logout();
    this.setState({ user: "", token: "" })

    this.props.history.push('/');
  }

  handleGoToRegister = () => {

    this.props.history.push('/register');

  }

  handleGoToLogin = () => {

    this.props.history.push('/login');

  }
  handleGoToLanding = () => {

    this.props.history.push('/');

  }
  
  handleGoToUser = () => {


    logic.retrieveFavorites()
      .then((houses) => this.setState({ userFavs: houses }))
      .then(() => logic.retrieveMyHouses())
      .then(houses => this.setState({ userHouses: houses }))
      .then(() => this.props.history.push('/user'))

  }
  handleGoToConversations = () => {

    this.props.history.push('/conversations');

  }

  toggleFavs = (id) => {

    let favs = this.state.userFavs
    let index = favs.indexOf(id)
    if (index < 0) favs.push(id)
    else favs.splice(index, 1)

    this.setState({ userFavs: favs })

    this.retrieveUser()


  }


  //#endregion

  render() {

    const {
      handleLogin, handleRegister, handleGoToConversations, handleGoToLogin, handleGoToLogout, handleGoToRegister, handleGoToUser, handleGoToLanding, toggleFavs,
      state: { user, loginFeedback, registerFeedback, token, userHouses, userFavs }
    } = this


    return (


      <div className="App" >
        <div className="navbar">
          <Header user={user} handleGoToConversations={handleGoToConversations} handleGoToLogin={handleGoToLogin} handleGoToLogout={handleGoToLogout} handleGoToRegister={handleGoToRegister} handleGoToUser={handleGoToUser} handleGoToLanding={handleGoToLanding} ></Header>

        </div>

        <div className="content" >
          <Switch>
            <Route path="/search/:query" render={() => <SearchResults toggleFavs={toggleFavs} />} />
            <Route exact path='/' render={() => <LandingPage />} />
            <Route exact path="/login" render={() => <Login loginFeedback={loginFeedback} onLogin={handleLogin} />} />
            <Route exact path="/register" render={() => <Register registerFeedback={registerFeedback} onRegister={handleRegister} />} />
          </Switch>
          <Route exact path="/user" render={() => <div>
            <MyHouses user={user} token={token} userHouses={userHouses} toggleFavs={toggleFavs} />
            <Favorites user={user} token={token} userFavs={userFavs} toggleFavs={toggleFavs} />

          </div>} />

        </div>


      </div>
    );
  }
}

export default withRouter(App);
