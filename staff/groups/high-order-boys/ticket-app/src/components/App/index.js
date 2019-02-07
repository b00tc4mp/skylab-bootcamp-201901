import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import Header from '../Header'
import Footer from '../Footer'


function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authed, onLogin, loginFeedback, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} onLogin={onLogin} loginFeedback={loginFeedback} />
        : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
    />
  )
}


class App extends Component {
  state = { loginFeedback: null, registerFeedback: null, user: null}

  componentDidMount(){
    logic.getUserApiToken() && logic.retrieveUser()
        .then(user => this.setState({user}))
}

  handleLogin = (email, password) => {
    try {
      logic.loginUser(email, password)
        .then(() => {    
          logic.retrieveUser()
            .then(user => this.setState({user}))
            .then(() => this.props.history.push('/home'))
        })
        .catch(({ message }) => this.setState({ loginFeedback: message }))
    } catch ({ message }) {
      this.setState({ loginFeedback: message })
    }
  }


  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
      logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => this.props.history.push('/login'))
        .catch(({ message }) => this.setState({ registerFeedback: message }))
    } catch ({ message }) {
      this.setState({ registerFeedback: message })
    }
  }

  handleLogout = () => {
    logic.setUserId()
    logic.setUserApiToken()
    this.setState({user: null})
    this.props.history.push('/login')
  }


  render() {
    
    const { handleLogin, handleRegister, handleLogout, state: { loginFeedback, registerFeedback, user } } = this
    return <main className="app">
      <Header user={user} onLogout={handleLogout} />
      <Redirect from="/" to="/home" />
      <PrivateRoute authed={!!logic.userLoggedIn} path='/home' component={Home} user={user} />
      <PublicRoute authed={!!logic.userLoggedIn} path='/login' component={Login} onLogin={handleLogin} loginFeedback={loginFeedback} />
      <Route exact path="/register" render={(props) => < Register onRegister={handleRegister} registerFeedback={registerFeedback} user={null} {...props} />} />
      <Footer />
    </main>
  }
}

export default withRouter(App)