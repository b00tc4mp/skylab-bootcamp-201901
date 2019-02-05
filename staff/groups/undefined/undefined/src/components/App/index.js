import React, { Component } from 'react';
import Home from '../Home'
import Register from '../Register'
import logic from '../../logic';
import Login from '../Login'


class App extends Component {

  state = { user: null, registerIsVisible: false, loginIsVisible: false}

  handleGoToRegister = event => {
    event.preventDefault()
    this.setState({ registerIsVisible: true})
  }
  
  handleGoToLogin = event => {
    event.preventDefault()
    this.setState({ loginIsVisible: true })
  }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {
    try {
        logic.Register(name, surname, email, password, passwordConfirmation)
        .then( () => {
          this.setState({registerIsVisible: false})
        })
        .catch(error =>{
          console.log(error)
        })
    }catch (error){ 
        //sync errors
    }
  }

  handleLogin = (email,password) => {
    try{
      
      logic.loginUser(email,password)
        .then(user =>{
          this.setState({user})
          console.log(user)
        }).catch( ({message}) => {
        this.setState({message})
        })

    }catch({message}){
      this.setState({message})
    }

  }
  render() {

    const {{handleGoToRegister, handleGoToLogin, handleRegister, handleLogin}, state: {registerIsVisible, user, loginIsVisible}} = this

    return (
        <div className="App">
          {!user && <button onClick={handleGoToRegister}>Register</button>}
          {!user && <button onClick={handleGoToLogin}>Login</button>}

          {registerIsVisible && <Register onRegister={handleRegister} />}
          {loginIsVisible && <Login onLogin={handleLogin} />}

          <Home />
        </div>
      )
  }
}
      
      
export default App;

