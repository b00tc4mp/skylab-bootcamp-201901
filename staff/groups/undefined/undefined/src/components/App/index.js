import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom' 

import Home from '../Home'
import Register from '../Register'
import logic from '../../logic';
import Login from '../Login'
import Topbar from '../Topbar'
import Favorites from '../Favorites';

import NotFound from '../Not-Found-404'
import Footer from '../Footer'

import './index.sass'


class App extends Component {

  state = { loginFeedback: null, registerFeedback: null }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
        logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then( () => {
          this.setState( {registerFeedback: null})
          this.props.history.push('/login')
          alert('you have successfully registered')
        })
        .catch(({message}) =>{
          this.setState({registerFeedback: message})
        })
    }catch ({message}){ 
      this.setState({registerFeedback: message})
    }
  }

  handleLogin = (email,password) => {
    try{

      logic.loginUser(email,password)
        .then( () => {
            this.setState({ loginFeedback: null })
            
            this.props.history.push('/home') 
            alert('you have successfully login')
        }).catch( ({message}) => {
            this.setState({ loginFeedback: message })
        })

    }catch({message}){
      this.setState({ loginFeedback: message })
    }
  }

  handleLogout = () => {
    logic.logout()
    this.props.history.push('/home')
  }


  render() {

    const {handleRegister, handleLogin, handleLogout, state: {loginFeedback, registerFeedback}} = this

    return (
        <div className="app">
          
          <Topbar user={logic.userLoggedIn} onLogout={handleLogout}/>

          <Switch>
            <Route path='/register' render={() => !logic.userLoggedIn?  <Register onRegister={handleRegister} feedback={registerFeedback}/> : <Redirect to='/login' /> }   />
            <Route path='/login' render={() => !logic.userLoggedIn? <Login onLogin={handleLogin} feedback={loginFeedback}/> : <Redirect to='/home' /> } />
            <Route exact path='/favorites' render={() => <Favorites /> } />
            <Route path='/home' render={() => <Home /> } />
            <Route component={NotFound} />
          </Switch>

          <Footer />
          
        </div>
      )
  }
}

export default withRouter(App);

