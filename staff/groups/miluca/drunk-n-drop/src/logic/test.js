o 
import React, { Component } from 'react'
import logic from '../logic'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Register from './Register'
import RegisterOk from './RegisterOk'
import Login from './Login'
import Home from './Home'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
​
class App extends Component {
  state = { lang: i18n.language, visible: null, error: null, name: null }
​
  handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })
​
  handleRegisterNavigation = () => this.props.history.push('/register')
​
  handleLoginNavigation = () => this.props.history.push('/login')
​
  handleLogin = (username, password) => {
    try {
      logic.loginUser(username, password)
        .then(() =>
          logic.retrieveUser()
        )
        .then(({ name }) => {
          this.setState({ name, error: null }, () => this.props.history.push('/home'))
        })
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }
​
  componentDidMount() {
    logic.isUserLoggedIn &&
      logic.retrieveUser()
        .then(user =>
          this.setState({ name: user.name })
        )
        .catch(error =>
          this.setState({ error: error.message })
        )
  }
​
  handleRegister = (name, surname, username, password) => {
    try {
      logic.registerUser(name, surname, username, password)
        .then(() =>
          this.setState({ visible: 'register-ok', error: null })
        )
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }
​
  handleLogout = () => {
    logic.logoutUser()
​
    this.props.history.push('/')
  }
​
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) this.setState({ visible: null })
  }
​
  render() {
    const {
      state: { lang, visible, error, name, hello },
      handleLanguageChange,
      handleRegisterNavigation,
      handleLoginNavigation,
      handleLogin,
      handleRegister,
      handleLogout
    } = this
​
    return <>
      <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />
​
      <Switch>
        <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />
​
        <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> :
          visible !== 'register-ok' ?
            <Register lang={lang} onRegister={handleRegister} error={error} /> :
            <RegisterOk lang={lang} onLogin={handleLoginNavigation} />
        } />
​
        <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login lang={lang} onLogin={handleLogin} error={error} />} />
​
        <Route path="/home" render={() => logic.isUserLoggedIn ? <Home lang={lang} name={name} onLogout={handleLogout} /> : <Redirect to="/" />} />
​
        <Redirect to="/" />
      </Switch>
    </>
  }
}
​
export default withRouter(App)