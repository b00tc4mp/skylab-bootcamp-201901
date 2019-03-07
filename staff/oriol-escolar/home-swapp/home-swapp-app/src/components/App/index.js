import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import logo from '../../logo.svg';
import './index.sass';
import Login from '../loginPanel'
import Register from '../registerPanel'
import LandingPage from '../LandingPage'
import Header from '../Header'
import logic from '../../logic'


class App extends Component {
  state = { user: "", loginFeedback: null, registerFeedback: null, registered: "" }


  handleLogin = (email, password) => {

    try {
      return logic.loginUser(email, password)
        .then(() => {
          return logic.retrieveUser()
            .then(user => this.setState({ user }))
          // .then(() => this.props.history.push('/home'))
        })
        .catch(({ message }) => {
          console.log(message)
          this.setState({ loginFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ loginFeedback: message })
    }
  }

  handleRegister = (username, email, password, passwordConfirm) => {

    try {
      return logic.registerUser(username, email, password, passwordConfirm)
        .then(() => this.setState({ registered: 'yes' }))
    } catch ({ message }) {
      this.setState({ registerFeedback: message })
    }
  }

  handleLogout = () => {
    logic.logout();

    this.props.history.push('/');
  }


  render() {

    const { handleLogin, handleRegister, state: { user, loginFeedback, registerFeedback, registered } } = this


    return (


      <div className="App">
          <Header user={user} ></Header>
          {!user && <Login loginFeedback={loginFeedback} onLogin={handleLogin}> </Login>}
          {/* {!registered && <Register registerFeedback={registerFeedback} onRegister={handleRegister}> </Register>} */}
          {<LandingPage registerFeedback={registerFeedback} onRegister={handleRegister}> </LandingPage>} 
      </div>
    );
  }
}

export default App;
