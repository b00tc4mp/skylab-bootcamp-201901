import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import logic from "../../logic";
import { Home } from "../Home";
import Login from "../Login";
import RegisterPlayer from "../RegisterPlayer";
import Ranking from "../Ranking";
import { Header } from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import { log } from "util";

class App extends Component {
  state = {
    player: null
  };
  handleLogin = (email, password) => {
    try {
      debugger;
      logic
        .loginPlayer(email, password)
        .then(response => {
          this.setState({ player: response.player });
          logic.storeToken(response.token);
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

  handleSetAvailable = matchId => {
    logic.addAvalabilityPlayer(this.state.player._id, matchId);
    console.log("available");
  };

  handleSetUnavailable = matchId => {
    logic.deleteAvalabilityPlayer(this.state.player._id, matchId);
    console.log("unavailable");
  };

  render() {
    const {
      handleLogin,
      handleRegister,
      handleSetAvailable,
      handleSetUnavailable
    } = this;
   
    return (
      <main>
        <Header />
        <Grid container justify="center" spacing={24}>
          <Route
            path="/register"
            render={() => <RegisterPlayer onRegister={handleRegister} />}
          />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route
            path="/home"
            render={() => (
              <Home
                handleSetAvailable={handleSetAvailable}
                handleSetUnavailable={handleSetUnavailable}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => <Redirect to={{ pathname: "/home" }} />}
          />
          <Route path="/players" component={Ranking} />
        </Grid>
      </main>
    );
  }
}
export default withRouter(App);
