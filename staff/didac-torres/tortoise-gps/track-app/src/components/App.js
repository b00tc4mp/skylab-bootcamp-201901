import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Landing from './Landing'
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Trackings from './Trackings';
import TrackingDetail from './TrackingDetail';
import Places from './Places'
import logic from '../logic'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = { visible: null, error: null, message:null, darkmode: false, user:null, tracker:{}}

  handleRegisterNavigation = () => this.props.history.push('/register')

  handleLoginNavigation = () => this.props.history.push('/login')

  handleBackLanding = () => this.props.history.push('/')

  handleHome = () => this.props.history.push('/home')

  handlePlaces = () => this.props.history.push('/places')

  handleTrackings = () => this.props.history.push('/trackers')


  handleLogin = async (email, password) => {
    try {
      await logic.loginUser(email, password)
      await logic.retrieveUser()
      return this.props.history.push('/home')
    } catch ( error ) {
      toast.error(error.message)
    }
  }

  handleRegister = async (name, surname, username, password, password2) => {
    try {
      await logic.registerUser(name, surname, username, password, password2)
      return this.props.history.push('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  handleProfile = async () => {
    try {
      const user = await logic.retrieveUser()
      this.setState({ user })
      return this.props.history.push('/profile')
    } catch (error) {
      toast.error(error.message)
    }
  }

  handleUpdateProfile = async (name,surname,email) => {
    try {
      const resp = await logic.updateUser(name,surname,email)
      const user = await logic.retrieveUser()
      toast.success(resp.message)
      return this.setState({ user })
    } catch (error) {
      toast.error(error.message)
    }
  }

  handleAddPOI = async(title,color,latitude,longitude) =>{
    try{
      const resp = await logic.addPOI(title,color,latitude,longitude)
      return toast.success(resp.message)
    }
   catch (error) {
    toast.error(error.message)
  }}

  handleAddTracking = async(serialNumber, licensePlate) =>{
    try{
      const resp = await logic.addTracker(serialNumber, licensePlate)
      return toast.success(resp.message)
    }
   catch (error) {
    toast.error(error.message)
  }


  }
  handleDeleteProfile = async() => {

    try{
      await logic.deleteUser()
      await logic.logoutUser()
      return this.props.history.push('/')
    }
   catch (error) {
    toast.error(error.message)
  }
  }

  handleTrackDetail = async(sn) => {
    try{
      const tracker = await logic.retrieveTrackerBySN(sn)
      return this.setState({ tracker }, () => this.props.history.push('/detail/' + tracker.serialNumber))
    }
   catch (error) {
    toast.error(error.message)
  }
  }

  handleLogout = async() => {

    await logic.logoutUser()
    this.props.history.push('/')

  }

  handleDarkMode = async() => {
    this.setState({darkmode: !this.state.darkmode})
  }

  render() {
    const {
      state: { error, message, darkmode, user, tracker},
      handleRegisterNavigation,
      handleLoginNavigation,
      handleBackLanding,
      handleRegister,
      handleLogin,
      handleHome,
      handleProfile,
      handleUpdateProfile,
      handleDeleteProfile,
      handleAddTracking,
      handleTrackings,
      handleLogout,
      handleAddPOI,
      handlePlaces,
      handleDarkMode,
      handleTrackDetail
    } = this

    return <div>
      {logic.isUserLoggedIn && <Navbar className="navbar-profile" onHome={handleHome} onProfile={handleProfile} onPlaces={handlePlaces} onTrackings={handleTrackings} onLogout={handleLogout} onDarkMode={handleDarkMode} />}
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={() => <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />
        <Route path="/register" render={() => <Register onRegister={handleRegister} onBack={handleBackLanding} error={error} />} />
        <Route path="/login" render={() => <Login onLogin={handleLogin} onBack={handleBackLanding} error={error} />} />
        <Route path="/home" render={() => logic.isUserLoggedIn ? <Home darkmode={darkmode} onTrackDetail={handleTrackDetail}/> : <Redirect to="/" />} />
        <Route path="/profile" render={() => logic.isUserLoggedIn ? <Profile onUpdateProfile={handleUpdateProfile} onDeleteProfile={handleDeleteProfile} user={user} message={message} error={error} /> : <Redirect to="/" />} />
        <Route path="/places" render={() => logic.isUserLoggedIn ? <Places onAddPOI={handleAddPOI} message={message} error={error}/> : <Redirect to="/" />} />
        <Route path="/trackers" render={() => logic.isUserLoggedIn ? <Trackings onAddTracking={handleAddTracking} message={message} error={error}/> : <Redirect to="/" />} />
        <Route path="/detail/:serialNumber" render={() => logic.isUserLoggedIn ? <TrackingDetail darkmode={darkmode} message={message} error={error} tracker={tracker}/> : <Redirect to="/" />} />
        <Redirect to="/" />
      </Switch>
    </div>
  }
}

export default withRouter(App)
