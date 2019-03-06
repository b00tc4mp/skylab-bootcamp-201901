import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import logo from '../../logo.svg';
import './index.sass';
import Login from '../loginPanel'
import logic from '../../logic'


class App extends Component {
  state={user:"", loginFeedback: null, registerFeedback: null}


  handleLogin = (email, password) => {

    try {
      logic.loginUser(email, password)
        .then(() => {    
          logic.retrieveUser()
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



  render() {

    const { handleLogin,state:{user,loginFeedback} }=this


    return (

      
      <div className="App">
        <header className="App-header">
          {!user && <Login loginFeedback={loginFeedback} onLogin = {handleLogin}> </Login>}
        </header>
      </div>
    );
  }
}

export default App;
