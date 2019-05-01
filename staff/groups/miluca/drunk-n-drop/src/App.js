import { BrowserRouter as Router, Route, Link, Prompt, Switch, withRouter } from "react-router-dom";
import React, { Component } from 'react'
import Login from './components/login/index'
import logic from '../src/logic'
import Search from '../src/components/search'
import Results from '../src/components/results/results'


//components

import Register from './components/register';
import Favorites from "./components/Favorites";

class App extends Component {

  state = { error: null, name: null, results: [] ,favoriteList :[]}

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

  handleSearch = (query) => {

     return logic.cocktailbyName(query)
     .then(response => {
       this.setState({results : response})
     })

  }

  handleFavorites = (id) =>{

    return logic.toggleFavoriteCocktail(id)

  }

  returnFavorites = () => {

   return logic.retriveFavorites()
    .then(response =>{
      this.setState({favoriteList: response})
    })

  }

  
  render() {
    const {
      state: { error, results,favoriteList},
      handleLogin,
      handleRegister,
      handleSearch,
      handleFavorites,
      returnFavorites
    } = this


    return <>
     
        <Favorites favs={favoriteList} giveFav={returnFavorites}/>
        <Register onRegister={handleRegister} error={error} />
        <Login onLogin={handleLogin} error={error} />
        <Search onSearch={handleSearch} error={error} />
        <Results items={results} onFavorites={handleFavorites} />
    </>

  }
}




export default App
