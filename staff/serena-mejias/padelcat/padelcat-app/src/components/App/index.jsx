import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import logic from "../../logic";
import { Home } from "../Home";
import Login from "../Login";
import RegisterPlayer from "../RegisterPlayer";
import { Header } from "../Header/Header";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  handleLogin = (email, password) => {
    try {
      logic
        .loginPlayer(email, password)
        .then(token => {
          logic.storeToken(token);
          this.props.history.push("/home");
        })
        .catch(error => {
          throw Error(error);
        });
    } catch (error) {
      throw Error(error);
    }
  };

  handleRegister = (
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
  ) => {
    try {
      logic
        .registerPlayer(
          name,
          surname,
          email,
          password,
          passwordConfirm,
          preferedPosition,
          link
        )
        .then(() => this.props.history.push("/login"))
        .catch(error => {
          throw Error(error);
        });
    } catch (error) {
      throw Error(error);
    }
  };

  render() {
    const { handleLogin, handleRegister } = this;
    return (
      <main>
        <Header />
        <Grid container justify="center" spacing={24}>
          <Route
            path="/register"
            render={() => <RegisterPlayer onRegister={handleRegister} />}
          />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route path="/home" component={Home} />
          <Route path="/" render={() => <Redirect to={{ pathname: "/home" }} />} />
        </Grid>
      </main>
    );
  }
}
export default withRouter(App);
