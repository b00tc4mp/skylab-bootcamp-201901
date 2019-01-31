spotifyApi.token =
  "BQD738jSjYoESErtOB53ndWN1nFcdCcrOMFS6Ni-RVm97wzMET-ommt-nf_V95OPVdfMH1shl9Hx3qJfYopGy49c8ClI_apQq_5Xxdd684N7loLjjsqErMYWA1FyVSio6SrHsdHIlukRaA";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      feedback: '',
      showLogin: true,
      showRegister: false,
      showSearcherApp: false,
      user: null
    };
  }

  updateUserState = (user) => {
    this.setState({ user });
  };

  handleClickRegisterButton = () => {
    this.setState({ showLogin: false, showRegister: true, feedback: '' });
  };

  handleClickLoginButton = () => {
    this.setState({ showLogin: true, showRegister: false, feedback: '' });
  };

  handleLogin = (email, password) => {
    try {
      logic.login(email, password, user => {
        this.setState({ user, showLogin: false, showSearcherApp: true, feedback: '' });
      });
    } catch ({ message }) {
      this.setState({ feedback: message });
    }
  };

  handleRegister = (name, surname, email, password, passwordConfirm) => {
    try {
      logic.register(name, surname, email, password, passwordConfirm, () => {
        this.setState({ showRegister: false, showLogin: true, feedback: '' });
      });
    } catch ({ message }) {
      this.setState({ feedback: message });
    }
  };

  render() {
    const {
      handleLogin,
      handleRegister,
      handleClickRegisterButton,
      handleClickLoginButton,
      updateUserState,
      state: { user }
    } = this;

    return (
      <div className="app">
        {this.state.showLogin && (
          <Login
            onLogin={handleLogin}
            onClickRegisterButton={handleClickRegisterButton} 
            feedback={this.state.feedback}
          />
        )}
        {this.state.showRegister && (
          <Register
            onRegister={handleRegister}
            onClickLoginButton={handleClickLoginButton}
            feedback={this.state.feedback}
          />
        )}
        {this.state.showSearcherApp && <SearcherApp user={user} updateUserState={updateUserState} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
