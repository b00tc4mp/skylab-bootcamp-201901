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
import CreateHouse from '../createHouse'
import DetailedHouse from '../detailedHouse'
import logic from '../../logic'


class App extends Component {
  state = {
    token: "",
    user: "",
    userFavs: "",
    userHouses: "",
    loginFeedback: null,
    registerFeedback: null,
    createHouseFeedback: null,
    registered: ""


  }




  componentDidMount() {
    logic.getUserApiToken() && logic.retrieveUser()
      .then(user => {

        this.setState({ user })




      })
      .then(() => this.userInfoRetriever())
      .then(() => this.updateInfo())



  }

  async userInfoRetriever() {
    // const user = await logic.registerUser()
    const userFavs = await logic.retrieveFavorites()
    const userHouses = await logic.retrieveMyHouses()
    this.setState({ userFavs, userHouses })
  }

  updateInfo = async () => {

    const user = await logic.retrieveUser()
    const userFavs = await logic.retrieveFavorites()
    const userHouses = await logic.retrieveMyHouses()
    this.setState({ user, userFavs, userHouses })
    console.log('updated')
    setTimeout(this.updateInfo, 3000);



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

  onCreateHouse = (imagesArray, description, infoObject, adressObject) => {

    try {
      return logic.createHouse(imagesArray, description, infoObject, adressObject)
        .then(() => this.updateInfo())
        .then(() => this.props.history.push('/user'))
        .catch(({ message }) => {
          this.setState({ createHouseFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ createHouseFeedback: message })
    }
  }

  toggleFavs = (id) => {

    let favs = this.state.userFavs
    let index = favs.indexOf(id)
    if (index < 0) favs.push(id)
    else favs.splice(index, 1)

    this.setState({ userFavs: favs })

    this.retrieveUser()


  }

  onCreateHousePage = () => {

    this.props.history.push('/createHouse');


  }

  retrieveHouse = (houseId) => {
    this.props.history.push(`/house/${houseId}`)

  }


  //#region  Header Functions 


  handleGoToLogout = () => {
    logic.logout();
    this.setState({ user: "", token: "" })

    this.props.history.push('/');
  }

  handleGoToRegister = () => {

    this.props.history.push('/register');
    this.setState({ loginFeedback: "" })

  }

  handleGoToLogin = () => {

    this.props.history.push('/login');
    this.setState({ registerFeedback: "" })


  }
  handleGoToLanding = () => {

    this.props.history.push('/');
    this.setState({ registerFeedback: "", loginFeedback: "" })


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



  //#endregion


  render() {

    const {

      handleLogin, handleRegister, handleGoToConversations, handleGoToLogin, handleGoToLogout, handleGoToRegister,
      handleGoToUser, handleGoToLanding, toggleFavs, updateInfo, onCreateHousePage, onCreateHouse, retrieveHouse,

      state: { user, loginFeedback, registerFeedback, token, userHouses, userFavs, createHouseFeedback }
    } = this


    return (


      <div className="App" >
        <div className="navbar">
          <Header user={user} handleGoToConversations={handleGoToConversations} handleGoToLogin={handleGoToLogin} handleGoToLogout={handleGoToLogout} handleGoToRegister={handleGoToRegister} handleGoToUser={handleGoToUser} handleGoToLanding={handleGoToLanding} ></Header>

        </div>

        <div className="content" >
          <Switch>
            <Route path="/search/:query" render={() => <SearchResults toggleFavs={toggleFavs} updateInfo={updateInfo} userFavs={userFavs} retrieveHouse={retrieveHouse} />} />
            <Route path="/house/:houseId" render={() => <DetailedHouse toggleFavs={toggleFavs} favorites={userFavs} />} />
            {/* <Route path="/editHouse/:houseId" render={() => <EditHouse />} /> */}
            <Route exact path="/createHouse" render={() => <CreateHouse onCreateHouse={onCreateHouse} createHouseFeedback={createHouseFeedback} />} />
            <Route exact path='/' render={() => <LandingPage />} />
            <Route exact path="/login" render={() => <Login loginFeedback={loginFeedback} onLogin={handleLogin} />} />
            <Route exact path="/register" render={() => <Register registerFeedback={registerFeedback} onRegister={handleRegister} />} />
          </Switch>
          <Route exact path="/user" render={() => <div>
            <MyHouses user={user} userHouses={userHouses} updateInfo={updateInfo} onCreateHousePage={onCreateHousePage} retrieveHouse={retrieveHouse} />
            <Favorites user={user} userFavs={userFavs} updateInfo={updateInfo} retrieveHouse={retrieveHouse} />

          </div>} />

        </div>


      </div>
    );
  }
}

export default withRouter(App);
