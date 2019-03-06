import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import logo from '../../logo.svg';
import './index.sass';
import Login from '../loginPanel'
import Register from '../registerPanel'
import logic from '../../logic'


class App extends Component {
  state={user:"", loginFeedback: null, registerFeedback: null, registered:""}


  handleLogin = (email, password) => {

    try {
      return logic.loginUser(email, password)
        .then(() => {    
          return logic.retrieveUser()
            .then(user => this.setState({user}))
            // .then(() => this.props.history.push('/home'))
        })
        .catch(({ message }) =>{
          console.log(message)
          this.setState({ loginFeedback: message })
        } )
    } catch ({ message }) {
      this.setState({ loginFeedback: message })
    }
  }

  handleRegister = (username, email, password, passwordConfirm) => {

    try {
      return logic.registerUser(username, email, password, passwordConfirm)
      .then(()=>this.setState({ registered: 'yes' }))
    } catch ({ message }) {
      this.setState({ registerFeedback: message })
    }
  }



  render() {

    const { handleLogin, handleRegister, state:{user,loginFeedback,registerFeedback,registered} }=this


    return (

      
      <div className="App">
        <header className="App-header">
          {registered && !user && <Login loginFeedback={loginFeedback} onLogin = {handleLogin}> </Login>}
          {!registered && <Register registerFeedback={registerFeedback} onRegister = {handleRegister}> </Register>}
        </header>
      </div>
    );
  }
}

export default App;
