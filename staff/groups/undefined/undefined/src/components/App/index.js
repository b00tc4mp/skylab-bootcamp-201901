import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom' 

import Home from '../Home'
import Register from '../Register'
import logic from '../../logic';
import Login from '../Login'


class App extends Component {

  state = { user: null, registerIsVisible: false, loginIsVisible: false, loginFeedback: null, registerFeedback: null }

  handleGoToRegister = event => {
    event.preventDefault()
    this.setState({ registerIsVisible: true, loginIsVisible: false, loginFeedback: null, registerFeedback: null})
    this.props.history.push('/register')
  }
  
  handleGoToLogin = event => {
    event.preventDefault()
    this.setState({ loginIsVisible: true, registerIsVisible: false, loginFeedback: null, registerFeedback: null})
    this.props.history.push('/login')
  }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
        logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then( () => {
          this.setState({registerIsVisible: false, registerFeedback: null})
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
        .then( () => {            // no devuelve nada - si hay error devuelve el mensaje de error
          this.setState({ loginFeedback: null }) //this.setState({user}) // aquí nos tenemos que guardar el ID para favoritos
                                                //LOCAL STORAGE
        }).catch( ({message}) => {
            this.setState({ loginFeedback: message })
        })

    }catch({message}){
      this.setState({ loginFeedback: message })
    }

  }
  render() {

    const {handleGoToRegister, handleGoToLogin, handleRegister, handleLogin, state: {registerIsVisible, user, loginIsVisible, loginFeedback, registerFeedback}} = this

    return (
        <div className="App">

          <Route path='/register' render={() => registerIsVisible && !loginIsVisible && <Register onRegister={handleRegister} feedback={registerFeedback}/> }   />
          <Route path='/login' render={() => !user? loginIsVisible && !registerIsVisible && <Login onLogin={handleLogin} feedback={loginFeedback}/> : <Redirect to='/' /> } />

          <Route path='/' render={() => !user && <button onClick={handleGoToRegister}>Register</button>} />
          <Route path='/' render={() => !user && <button onClick={handleGoToLogin}>Login</button>} />

          <Route path='/' render={() => !loginIsVisible && !registerIsVisible && <Home /> } />

        </div>
      )
  }
}

export default withRouter(App);

