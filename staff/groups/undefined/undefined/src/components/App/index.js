import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom' 

import Home from '../Home'
import Register from '../Register'
import logic from '../../logic';
import Login from '../Login'
import Topbar from '../Topbar'
import Favorites from '../Favorites';



class App extends Component {

  state = { user: null, loginFeedback: null, registerFeedback: null }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
        logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then( () => {
          this.setState( {registerFeedback: null})
          this.props.history.push('/login')
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
            this.setState({ loginFeedback: null, user: true})
            this.props.history.push('/')                                     //LOCAL STORAGE
        }).catch( ({message}) => {
            this.setState({ loginFeedback: message })
        })

    }catch({message}){
      this.setState({ loginFeedback: message })
    }
  }

  handleLogout = () => {
    logic.logout()
    this.props.history.push('/')
    this.setState( {user: null})
  }


  render() {

    const {handleRegister, handleLogin, handleLogout, state: {user, loginFeedback, registerFeedback}} = this

    return (
        <div className="app">
          
          <Topbar user={user} onLogout={handleLogout}/>

          <Switch>
            <Route path='/register' render={() => !user && <Register onRegister={handleRegister} feedback={registerFeedback}/> }   />
            <Route path='/login' render={() => !user? <Login onLogin={handleLogin} feedback={loginFeedback}/> : <Redirect to='/' /> } />
 
            <Route path='/' render={() => <Home /> } />
              
            <Route path='/favorites' render={() => <Favorites /> } />
          </Switch>


        </div>
      )
  }
}

export default withRouter(App);

