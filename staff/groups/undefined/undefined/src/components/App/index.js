import React, { Component } from 'react';
import Home from '../Home'
import Register from '../Register'
import logic from '../../logic';


class App extends Component {

  state ={ user: null, registered: null}


  handleGoToRegister = () =>{
    this.setState({ registered: true})
  }

  handleRegister = (name, surname, email, password, passwordConfirmation) => {

    try {
        logic.Register(name, surname, email, password, passwordConfirmation)
        .then( () => {
          this.setState({registered: null})
        })
        .catch(error =>{
          console.log(error)
        })
    }catch (error){ 

    }
  }

  render() {

    const {handleGoToRegister, handleRegister, state: {registered, user}} = this

    return (
      <div className="App">
        {!user && <button onClick={handleGoToRegister}>Register</button>}
        {user && <Home />}
        {registered && <Register onRegister={handleRegister}/>}
      </div>
    )
  }
}

export default App;
