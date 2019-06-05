import React, { Component } from 'react'
import logic from './logic'
import Register from './components/Register'
import Login from './components/Login'

import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

import './index.sass'

// export default function App() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
// }

class App extends Component {

  state = { error: null, name: null }

  handleRegister(name, email, password) {
    try {
      logic.registerUser(name, email, password)
        .then(() =>
        this.props.history.push('/login')
        )
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleLogin = (email, password) => {
    try {
      logic.loginUser(email, password)
        .then(() =>
          logic.retrieveUser()
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  render() {
    const {
      state: { error },
      handleRegister,
      handleLogin
      } = this

      return <>
          {/* <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} />} /> */}
          <Route exact path="/register" render={() => <Register onRegister={handleRegister} error={error}/>} />
          <Route exact path="/login" render={() => <Login onLogin={handleLogin} error={error}/>} />
          {/* <Route exact path='/register' component={Register} /> */}
      
      </>

    }

  }
  export default withRouter(App);
