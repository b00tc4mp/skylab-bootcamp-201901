import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import userStorage from '../../localstorage'
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
  state = { loginFeedback: null, registerFeedback: null }

  // componentWillMount(){
  //     this.setState({isAuth: !!userStorage.auth})
  // }

  handleLogin = (email, password) => {
    try {
      logic.loginUser(email, password)
        .then(() => logic.retrieveUser(email, password))
        .then(() => this.props.history.push('/home'))
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
    userStorage.deleteUserToken()
    this.props.history.push('/login')
  }


  render() {
    const { handleLogin, handleRegister, handleLogout, state: { loginFeedback, registerFeedback } } = this

    return <main className="app">
      < Header user={userStorage.auth} onLogout={handleLogout} />
      < Redirect from="/" to="/home" />
      < PrivateRoute authed={!!userStorage.auth} path='/home' component={Home} />
      < PublicRoute authed={!!userStorage.auth} path='/login' component={Login} onLogin={handleLogin} loginFeedback={loginFeedback} />
      < Route exact path="/register" render={(props) => < Register onRegister={handleRegister} registerFeedback={registerFeedback} />} />
      < Footer />
    </main>
  }
}

export default withRouter(App)