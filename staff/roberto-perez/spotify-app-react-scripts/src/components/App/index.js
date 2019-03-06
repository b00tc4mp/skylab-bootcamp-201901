import React, { Component } from "react";
import "./index.sass";
import logic from "../../logic";
import Login from "../Login/index";
import Register from "../Register/index";
import Home from "../Home/index";

class App extends Component {
  state = { 
    user: null, 
    showLogin: true 
  };

  handleLogin = (email, password) => {
    try {
      logic.login(email, password, user => {
        this.setState({ user });
      });
    } catch ({ message }) {
      // this.setState({ loginFeedback: message });
    }
  };

  handleRegister = (name, surname, email, password, passwordConfirm) => {
    try {
      logic.register(name, surname, email, password, passwordConfirm, () => {
        this.setState({ showLogin: true });
      });
    } catch ({ message }) {
      // this.setState({ feedback: message });
    }
  };

  handleClickRegisterButton = () => {
    this.setState({ showLogin: false });
  };

  handleClickLoginButton = () => {
    this.setState({ showLogin: true });
  };

  render() {
    const {
      handleLogin,
      handleRegister,
      handleClickRegisterButton,
      handleClickLoginButton,
      state: { user, showLogin }
    } = this;

    return (
      <div className="app">
        {!user && showLogin && (
          <Login
            onLogin={handleLogin}
            onClickRegisterButton={handleClickRegisterButton}
          />
        )}
        {!user && !showLogin && (
          <Register
            onRegister={handleRegister}
            onClickLoginButton={handleClickLoginButton}
          />
        )}
        {user && <Home user={user} />}
      </div>
    );
  }
}

export default App;
