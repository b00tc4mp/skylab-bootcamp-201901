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

    searchText: null,
    pokemonVisible: "",
    loginPanelVisible: false,
    user: null,
    loginFeedback: '',
    registerPanelVisible: false,
    registerFeedback: '',

  }

  handlePokemonDetail = (name) => {
    debugger
    logic.retrievePokemon(name)
      .then((pokemonVisible) => {
        debugger
        return this.setState({ pokemonVisible })

      })


  }

  onBackButtonDetailedPokemon = () => {
    this.setState({ pokemonVisible: null, searchText: this.state.searchText })

  }

  setSearchTextApp = (query) => {
    this.setState({ searchText: query })

  }

  hideLoginFeedback = () => this.setState({ loginFeedback: '' })
  showLoginFeedback = message => {
    this.setState({ loginFeedback: message })
    setTimeout(this.hideLoginFeedback, 2000)
  }


  onLoginRequested = (user, password) => {
    try {
      logic.loginUser(user, password)
        .then(({ user }) => {
          this.setState({ user })
        })
        .catch(({ message }) => this.showLoginFeedback(message))
    } catch ({ message }) {
      this.showLoginFeedback(message)
    }
  }





  toogleShowLogin = () => {
    const bool = !this.state.loginPanelVisible
    this.setState({ loginPanelVisible: bool })
  }

  registerPanelVisible = () => this.setState({ registerPanelVisible: !this.state.registerPanelVisible })


  hideRegisterPanel = () => this.setState({ registerPanelVisible: false })
  hideLoginrPanel = () => this.setState({ loginPanelVisible: false })




  hideRegisterFeedback = () => this.setState({ registerFeedback: '' })
  showRegisterFeedback = message => {
    this.setState({ registerFeedback: message })
    setTimeout(this.hideRegisterFeedback, 2000)
  }



  onRegisterRequested = (email, username, password, passwordConfirmation) => {
    this.setState({ registerPanelVisible: false })
    try {

      logic.registerUser(email, username, password, passwordConfirmation)
        .then(user => {
          this.setState({ user })
        })

        .catch(({ message }) => this.showRegisterFeedback(message))
    } catch ({ message }) {
      this.showRegisterFeedback(message)

    }
  }



  render() {
    const {
      state: { pokemonVisible, user, loginPanelVisible, loginFeedback, registerPanelVisible, registerFeedback }
    } = this

    return (
      <div className="App">
        {!user && <Home onHandleShowLogin={this.toogleShowLogin} onHandleShowRegister={this.registerPanelVisible} />}
        {!user && <LoginPanel onLogin={this.onLoginRequested} show={loginPanelVisible} message={loginFeedback} goBackHomeLogin={this.hideLoginrPanel} />}
        {!user && <RegisterPanel onRegister={this.onRegisterRequested} show={registerPanelVisible} message={registerFeedback} goBackHomeRegister={this.hideRegisterPanel} />}
        {user && !pokemonVisible && <PokemonSearch onPokemonDetail={this.handlePokemonDetail} setSearchTextApp={this.setSearchTextApp} searchText={this.state.searchText} />}
        {user && <MainPanel />}
        {pokemonVisible && <DetailedPokemonPanel pokemonToShow={pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon} />}


      </div>
    );
  }
}

export default App;



function bindEvent(e, eventName, callback) {
  if (e.addEventListener) // new browsers
    e.addEventListener(eventName, callback, false);
  else if (e.attachEvent) // IE
    e.attachEvent('on' + eventName, callback);
};

bindEvent(document.body, 'scroll', function (e) {
  document.body.scrollLeft = 0;
});

