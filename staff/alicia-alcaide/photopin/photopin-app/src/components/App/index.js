import React, { Component } from "react";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";

import logic from "../../logic";
import Landing from "../Landing";
import Register from "../Register";
import Welcome from "../Welcome";
import Login from "../Login";
import Home from "../Home";
import MapPage from "../Map";
import MapForm from "../YourMaps/MapForm";

class App extends Component {
  state = { lang: "en", error: null };

  handleRegisterNavigation = () => this.props.history.push("/register");

  handleLoginNavigation = () => this.props.history.push("/login");

  handleRegister = (name, surname, email, password) => {
    logic
      .registerUser(name, surname, email, password)
      .then(() => this.props.history.push("/welcome"))
      .catch(error => this.setState({ error: error.message }));
  };

  handleLogin = (email, password) => {
    try {
      logic
        .loginUser(email, password)
        .then(() => logic.retrieveUser())
        .then(() => {
          this.setState({ error: null }, () => this.props.history.push("/home"));
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    } catch ({ error }) {
      this.setState({ error: error.message });
    }
  };

  handleLogout = () => {
    logic.logoutUser();
    this.props.history.push("/");
  };

  handleLangChange = lang => {
    this.setState({ lang });
  };

  handleClearError = () => this.setState({ error: null });

  render() {
    const {
      state: { lang, error },
      handleRegisterNavigation,
      handleLoginNavigation,
      handleLogin,
      handleRegister,
      handleLogout,
      handleLangChange,
      handleClearError
    } = this;

    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              logic.isUserLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                  <Landing
                    lang={lang}
                    onRegister={handleRegisterNavigation}
                    onLogin={handleLoginNavigation}
                    onLangChange={handleLangChange}
                  />
                )
            }
          />

          <Route
            path="/register"
            render={() =>
              logic.isUserLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                  <Register
                    lang={lang}
                    onRegister={handleRegister}
                    error={error}
                    onLangChange={handleLangChange}
                    onClearError={handleClearError}
                  />
                )
            }
          />

          <Route
            path="/welcome"
            render={() =>
              logic.isUserLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                  <Welcome
                    lang={lang}
                    onLogin={handleLoginNavigation}
                    error={error}
                    loggedOut={false}
                    onLangChange={handleLangChange}
                  />
                )
            }
          />

          <Route
            path="/login"
            render={() =>
              logic.isUserLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                  <Login
                    lang={lang}
                    onLogin={handleLogin}
                    error={error}
                    onLangChange={handleLangChange}
                    onClearError={handleClearError}
                  />
                )
            }
          />

          <Route
            path="/home"
            render={() =>
              logic.isUserLoggedIn ? (
                <Home lang={lang} onLogout={handleLogout} onLangChange={handleLangChange} />
              ) : (
                  <Redirect to="/" />
                )
            }
          />

          <Route
            path="/map/:id"
            render={() =>
              logic.isUserLoggedIn ? (
                <MapPage lang={lang} onLogout={handleLogout} onLangChange={handleLangChange} />
              ) : (
                  <Redirect to="/" />
                )
            }
          />

          <Route
            exact
            path="/mapform/:id"
            render={() =>
              logic.isUserLoggedIn ? (
                <MapForm lang={lang} onLogout={handleLogout} onLangChange={handleLangChange} />
              ) : (
                  <Redirect to="/" />
                )
            }
          />

          <Route
            path="/mapform"
            render={() =>
              logic.isUserLoggedIn ? (
                <MapForm lang={lang} onLogout={handleLogout} onLangChange={handleLangChange} />
              ) : (
                  <Redirect to="/" />
                )
            }
          />

          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
