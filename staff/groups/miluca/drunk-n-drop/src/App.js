
import React, { Component } from 'react'
import Login from './components/login/index'
import logic from '../src/logic';
import Search from '../src/components/search'
import { BrowserRouter as Router, Route, Link, Prompt, Switch, withRouter } from "react-router-dom";
import Register from './components/register';

class App extends Component {

  state = { error: null, name: null, results: null }

  handleLogin = (username, password) => {

    try {
      logic.loginUser(username, password)
        .then(() =>
          logic.retrieveUser()
        )
        .then(({ name }) => {
          this.setState({ name, error: null })
        })
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }


  handleRegister = (name, username, password) => {
    try {
      logic.registerUser(name, username, password)
        .then(() =>
          this.setState({ error: null })
        )

    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleSearch = query => {
  
      logic.cocktailbyName(query)
        
   
  }

  render() {
    const {
      state: { error, results },
      handleLogin,
      handleRegister,
      handleSearch
    } = this


    return <>
      <Router>
        <Route exact path="/register" render={() => <Register onRegister={handleRegister} error={error} />} />
        <Route exact path="/login" render={() => <Login onLogin={handleLogin} error={error} />} />
        <Route exact path="/search" render={() => <Search onSearch={handleSearch} error={error} />} />
      </Router>
    </>

  }
}




export default App
