import React, { Component } from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";
import DetailedPokemonPanel from "./components/DetailPanel"
import MainPanel from "./components/mainPanel"
import logic from "./logic";
import Home from './components/Home'
import LoginPanel from "./components/LoginPanelComponent";
import RegisterPanel from "./components/RegisterPanel";

class App extends Component {
  state = {
    pokemonVisible: null,
    searchText: null,
    loginPanelVisible: false,
    registerPanelVisible: false
  }
  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => this.setState({ pokemonVisible }))

  }

  onBackButtonDetailedPokemon = () => {
    this.setState({ pokemonVisible: null, searchText: this.state.searchText })

  }

  setSearchTextApp = (query) => {
    this.setState({ searchText: query })

  }

  onLoginRequested = (username, password) => {
    try {
      logic.loginUser(username, password)
    } catch (error) {

    }
  }
  toogleShowLogin = () => {
    const bool = !this.state.loginPanelVisible
    this.setState({ loginPanelVisible: bool })
  }

  showRegister = () => {
    (this.state.registerPanelVisible) === false ? this.setState({ registerPanelVisible: true }) : this.setState({ registerPanelVisible: false })


  }

  onRegisterRequested = (email, username, password, passwordConfirmation) => {
    try {

      logic.registerUser(email, username, password, passwordConfirmation)
        .then(user => {
          this.setState({ loginFeedback: '', user })
        })
        .catch(({ message }) => this.setState({ loginFeedback: message }))
    } catch ({ message }) {
      this.setState({ loginFeedback: message })

    }
  }

  render() {
    const {
      state: { pokemonVisible, loginPanelVisible, registerPanelVisible }
    } = this

    return (
      <div className="App">
        <Home onHandleShowLogin={this.toogleShowLogin} onHandleShowRegister={this.showRegister} />
        <LoginPanel onLogin={this.onLoginRequested} show={loginPanelVisible} />
        <RegisterPanel onRegister={this.onRegisterRequested} show={registerPanelVisible} />
        {/* {{!pokemonVisible && <PokemonSearch onPokemonDetail={this.handlePokemonDetail} setSearchTextApp={this.setSearchTextApp} searchText={this.state.searchText} />}
        {pokemonVisible && <DetailedPokemonPanel pokemonToShow={pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon} />}} */}

      </div>
    );
  }
}

export default App;



function bindEvent(e, eventName, callback) {
  if(e.addEventListener) // new browsers
      e.addEventListener(eventName, callback, false);
  else if(e.attachEvent) // IE
      e.attachEvent('on'+ eventName, callback);
};

bindEvent(document.body, 'scroll', function(e) {
  document.body.scrollLeft = 0;
});