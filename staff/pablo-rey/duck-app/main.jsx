const { Component } = React;

class App extends Component {
  state = { 
    viewState : logic.isLogged ? 'home' : 'landing', 
    errorMessage : '',
    selectedLanguage: 'en',
    name : null
  }

  componentDidMount() {
    logic.isLogged && logic.retrieveUser(({ name }) => this.setState({name }))
  }

  onLanguageChange = (selectedLanguage) => {
    this.setState ({ selectedLanguage });
  }

  onRegister = (name, surname, email, password) => {
    try {
      logic.registerUser(name, surname, email, password, response => {
        if (!response) {
          this.setState({viewState: "registerOk"});
        } else {
          this.setState( { errorMessage : response.message });
        }
      });
    } catch (error) {
      this.setState( { errorMessage : error.message });
    }
  }

  onLogin = (email, password) => {
    try {
      logic.loginUser(email, password, (response) => {
        if (!response) {
          logic.retrieveUser((user) => {
            this.setState({ name: user.name });
          })
          this.setState({viewState: "home"});
        } else {
          this.setState( { errorMessage : response.message });
        }
      });

    } catch (error) {
      this.setState( { errorMessage : error.message });
    }
  }

  onLogout = () => {
    logic.logout();
    this.setState({viewState: "landing"});
  }

  onLoginNav = () => {
    this.setState({viewState : "login"});
  }

  onRegisterNav = () => {
    this.setState({viewState : "register"});
  }

  render() { 
    const { state } = this;

    return (
    <>
      <nav>
        <LanguageSelector onLanguageChange={this.onLanguageChange} />
        <LogOut onLogout={this.onLogout} literals={i18n.logout} selectedLanguage={state.selectedLanguage} />
      </nav>
      {(state.viewState === 'landing') && 
        <Landing 
          onLoginNav={this.onLoginNav} 
          onRegisterNav={this.onRegisterNav} 
          literals={i18n.landing}
          selectedLanguage={state.selectedLanguage}
        />}
      {(state.viewState === 'register') && 
        <Register 
          onRegister={this.onRegister} 
          literals={i18n.register}
          selectedLanguage={state.selectedLanguage}
          errorMessage={state.errorMessage}
        />}
      {(state.viewState === 'registerOk') && 
        <RegisterOk
          onNavLogin={this.onLoginNav} 
          literals={i18n.register}
          selectedLanguage={state.selectedLanguage}
        />}

      {(state.viewState === 'login') && 
        <Login 
          onLogin={this.onLogin} 
          literals={i18n.login}
          selectedLanguage={state.selectedLanguage}
          errorMessage={state.errorMessage}
        />}
      {(state.viewState === 'home') && 
        <Home 
          literals={i18n.home}
          selectedLanguage={state.selectedLanguage}
          name={state.name}
        />}
    </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
