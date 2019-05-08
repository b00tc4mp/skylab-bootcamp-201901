import { BrowserRouter as Router, Route, Link, Prompt, Switch, withRouter } from "react-router-dom";
import React, { Component } from 'react'
import logic from '../src/logic'
import CocktailResults from "./components/CocktailResults"
import Home from './components/Home'

class App extends Component {

  state = { errorSearch: null, error: null, name: null, results: [], favoriteList: [], populars: [], details: {}, visible: false }

  /* handleLogin = (username, password) => {

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
        this.setState({ results: response })
      })
      .catch(response => {
        this.setState({ errorSearch: response.message })
      })

  }

  handleFavorites = (id) => {

    return logic.toggleFavoriteCocktail(id)

  }

  returnFavorites = () => {

    return logic.retriveFavorites()
      .then(response => {
        this.setState({ favoriteList: response })
      })

  }

  handlePpopular = () => {

    return logic.popularCocktails()
      .then(response => {

        this.setState({ populars: response })
      })
  }

  handleDetail = (id) => {

    return logic.cocktailDetail(id)
      .then(response => {
        this.setState({ details: response, visible: true })
      })
  }



 */
  render() {

    return <>

      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <CocktailResults />
      </Switch>
    </>

  }
}




export default withRouter(App)
