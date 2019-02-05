import React, { Component } from 'react';
import Home from '../Home'
import Register from '../Register'
import logic from '../../logic';
import Login from '../Login'


class App extends Component {

  state = { user: null, registerIsVisible: false, loginIsVisible: false, loginFeedback: null, registerFeedback: null }

  handleGoToRegister = event => {
    event.preventDefault()
    this.setState({ registerIsVisible: true, loginIsVisible: false, loginFeedback: null, registerFeedback: null})
  }
  
  handleGoToLogin = event => {
    event.preventDefault()
    this.setState({ loginIsVisible: true, registerIsVisible: false, loginFeedback: null, registerFeedback: null})
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

          {!user && <button onClick={handleGoToRegister}>Register</button>}
          {!user && <button onClick={handleGoToLogin}>Login</button>}

          {registerIsVisible && !loginIsVisible && <Register onRegister={handleRegister} feedback={registerFeedback}/>}
          {loginIsVisible && !registerIsVisible && <Login onLogin={handleLogin} feedback={loginFeedback}/>}

          {!loginIsVisible && !registerIsVisible && <Home /> }

        </div>
      )
  }
}
      
      
export default App;

