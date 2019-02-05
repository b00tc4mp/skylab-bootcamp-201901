import React, { Component } from "react"
import "./App.css"
import PokemonSearch from "./components/PokemonSearch"
import logic from "./logic"
import Home from './components/Home'
import LoginPanel from "./components/LoginPanelComponent"

class App extends Component {
  state = {

    searchText: null,
    loginPanelVisible : false,
    user: null,
    loginFeedback: ''

  }

  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => this.setState({ pokemonVisible }))

  }

  onBackButtonDetailedPokemon = () => {
    this.setState({ pokemonVisible: null, searchText:this.state.searchText })

  }

  setSearchTextApp = (query) => {
    this.setState({ searchText:query })

  }

  onLoginRequested = (user, password) => {
    try {
        logic.loginUser(user, password)
          .then(({user}) => {
            this.setState({user})
          })
          .catch(({ message }) => this.setState({ loginFeedback: message }))
    } catch ({message}) {
        this.setState({ loginFeedback: message })
    }
  }





  toogleShowLogin = () => {
    const bool = !this.state.loginPanelVisible
    this.setState({loginPanelVisible : bool})
  }

  render() {
    const {
      state: { user, loginPanelVisible, loginFeedback }
    } = this

    return (
      <div className="App">
        {!user && <Home onHandleShowLogin = {this.toogleShowLogin}/>}
        {!user && <LoginPanel onLogin={this.onLoginRequested} show={loginPanelVisible} message={loginFeedback} />}
        {user && <PokemonSearch onPokemonDetail={this.handlePokemonDetail} setSearchTextApp={this.setSearchTextApp} searchText={this.state.searchText} />}
      </div>
    );
  }
}

export default App;
