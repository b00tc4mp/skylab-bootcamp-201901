import React, { Component } from 'react';
import i18n from '../i18n'
import logic from '../../logic'
import LanguageSelector from '../LanguageSelector';
import LogOut from '../LogOut'
import LogIn from '../LogIn'
import Home from '../Home'
import Landing from '../Landing'
import Register from '../../pages/Register'
import RegisterOk from '../RegisterOk'

class App extends Component {
  state = {
    viewState: logic.isLogged ? "home" : "landing",
    errorMessage: "",
    selectedLanguage: i18n.language,
    name: null,
  };

  componentDidMount() {
    logic.isLogged &&
      logic.retrieveUser().then(({ name }) => this.setState({ name }));
  }

  onLanguageChange = selectedLanguage => {
    i18n.language = selectedLanguage;
    this.setState({ selectedLanguage });
  };

  onRegister = (name, surname, email, password) => {
    try {
      logic
        .registerUser(name, surname, email, password)
        .then(() => this.setState({ viewState: "registerOk" }))
        .catch(error => this.setState({ errorMessage: error.message }));
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onLogin = (email, password) => {
    try {
      logic.loginUser(email, password)
        .then(() => logic.retrieveUser())
        .then(user => this.setState({ name: user.name, viewState: "home" }))
        .catch(error => this.setState({ errorMessage: error.message }));
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onLogout = () => {
    logic.logout();
    this.setState({ viewState: "landing" });
  };

  onLoginNav = () => {
    this.setState({ viewState: "login" });
  };

  onRegisterNav = () => {
    this.setState({ viewState: "register" });
  };

  render() {
    const { state } = this;

    return (
      <>
        <nav className="nav">
          <LanguageSelector onLanguageChange={this.onLanguageChange} lang={this.state.selectedLanguage}/>
          {logic.isLogged && <LogOut
            onLogout={this.onLogout}
            literals={i18n.logout}
            selectedLanguage={state.selectedLanguage}
          />}
        </nav>
        {state.viewState === "landing" && (
          <Landing
            onLoginNav={this.onLoginNav}
            onRegisterNav={this.onRegisterNav}
            literals={i18n.landing}
            selectedLanguage={state.selectedLanguage}
          />
        )}
        {state.viewState === "register" && (
          <Register
            onRegister={this.onRegister}
            literals={i18n.register}
            selectedLanguage={state.selectedLanguage}
            errorMessage={state.errorMessage}
          />
        )}
        {state.viewState === "registerOk" && (
          <RegisterOk
            onNavLogin={this.onLoginNav}
            literals={i18n.register}
            selectedLanguage={state.selectedLanguage}
          />
        )}

        {state.viewState === "login" && (
          <LogIn
            onLogin={this.onLogin}
            literals={i18n.login}
            selectedLanguage={state.selectedLanguage}
            errorMessage={state.errorMessage}
          />
        )}
        {state.viewState === "home" && (
          <Home
            literals={i18n.home}
            selectedLanguage={state.selectedLanguage}
            name={state.name}
          />
        )}
      </>
    );
  }
}

export default App;