import { BrowserRouter as Router, Route, Link, Prompt, Switch, withRouter } from "react-router-dom";
import React, { Component } from 'react'
import Login from './components/login/index'
import logic from '../src/logic'
import Search from '../src/components/search'
import Results from '../src/components/results/results'
import Landing from '../src/components/Landing/index'


//components

import Register from './components/register';
import Favorites from "./components/Favorites";
import Populars from "./components/Populars";
import Detail from "./components/Detail";

class App extends Component {

  state = { error: null, name: null, results: [] ,favoriteList :[] , populars : [] , details:{}}

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

  handlePpopular =() =>{

    return logic.popularCocktails()
    .then(response =>{
     
      this.setState({populars:response})
    })
  }

  handleDetail = (id) =>{
  
    return logic.cocktailDetail(id)
    .then(response =>{
      this.setState({details : response})
    })
  }

  
  render() {
    const {
      state: { error, results,favoriteList,populars ,details},
      handleLogin,
      handleRegister,
      handleSearch,
      handleFavorites,
      handlePpopular,
      returnFavorites,
      handleDetail
    } = this


    return <>
        <Landing/>
        <Detail detail={details}/> 
        <Populars pops={populars} givePop={handlePpopular}  onFavorites={handleFavorites} onDetail={handleDetail}/>
        <Favorites favs={favoriteList} giveFav={returnFavorites} onDetail={handleDetail}/>
        <Register onRegister={handleRegister} error={error} />
        <Login onLogin={handleLogin} error={error} />
        <Search onSearch={handleSearch} error={error} />
        <Results items={results} onFavorites={handleFavorites} onDetail={handleDetail} />
    </>

  }
}




export default App
