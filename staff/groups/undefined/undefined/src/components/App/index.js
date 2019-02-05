import React, { Component } from 'react';
import Home from '../Home'
import Login from '../Login'
import logic from '../../logic'


class App extends Component {

state = { Login : false}


onGoToLogin = event => {
  event.preventDefault()
  this.setState({Login: true})

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
    const {props : {onGoToLogin , handleLogin}} = this
    return (
      <div className="App">
        <button onClick={onGoToLogin}>Login</button>
        <Home /> 
        <Login onClick={onGoToLogin} onLogin={() => handleLogin} />
      </div>
    )
  }
}

export default App;
