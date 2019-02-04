import React, { Component } from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";
import DetailedPokemonPanel from "./components/DetailPanel"
import logic from "./logic";
import Home from './components/Home'
import LoginPanel from "./components/LoginPanelComponent";

class App extends Component {
  state = {
    pokemonVisible: null,
    searchText: null,
    loginPanelVisible : false
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

  onLoginRequested = (username, password) => {
    try {
        logic.loginUser(username, password)
    } catch (error) {
      //Funciton de errorPanel
    }
  }
  toogleShowLogin = () => {
    const bool = !this.state.loginPanelVisible
    this.setState({loginPanelVisible : bool})
  }

  render() {
    const {
      state: { pokemonVisible, loginPanelVisible }
    } = this

    return (
      <div className="App">
        <Home onHandleShowLogin = {this.toogleShowLogin}/>
        <LoginPanel onLogin={this.onLoginRequested} show={loginPanelVisible} />
        {/* {!pokemonVisible && <PokemonSearch onPokemonDetail={this.handlePokemonDetail} setSearchTextApp={this.setSearchTextApp} searchText={this.state.searchText} />}
        {pokemonVisible && <DetailedPokemonPanel pokemonToShow={pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon} />} */}
      </div>
    );
  }
}

export default App;
