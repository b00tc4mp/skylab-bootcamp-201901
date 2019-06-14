import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import logic from "../../logic";
import { Home } from "../Home";
import Login from "../Login";
import RegisterPlayer from "../RegisterPlayer";
import Ranking from "../Ranking";
import { Header } from "../Header/Header";
import styles from "./index.module.scss";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[200] }
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: '"Poppins", sans-serif'
  }
});

class App extends Component {
  state = {
    player: null,
    loginFeedback: null,
    registerFeedback: null
  };

  handleLogin = (email, password) => {
    try {
      logic
        .loginPlayer(email, password)
        .then(response => {
          this.setState({ player: response.player });
          logic.storeToken(response.token);
          this.props.history.push("/home");
        })
        .catch(({ response }) => {
          this.setState({ loginFeedback: response.data.err });
        });
    } catch (error) {
      this.setState({ loginFeedback: error });
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
        .then(() => {
          toast("🦄 Succesfully register!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          setTimeout(() => this.props.history.push("/login"), 3000);
        })
        .catch(({ response }) => {
          this.setState({ registerFeedback: response.data.err });
        });
    } catch (error) {
      this.setState({ registerFeedback: error });
    }
  };

  handleSetAvailable = matchId => {
    try {
      logic
        .addAvalabilityPlayer(this.state.player._id, matchId)
        .catch(({ response }) => {
          this.setState({ registerFeedback: response.data.err });
        });
    } catch (error) {
      this.setState({ registerFeedback: error });
    }
  };

  handleSetUnavailable = matchId => {
    try {
      logic
        .deleteAvalabilityPlayer(this.state.player._id, matchId)
        .catch(({ response }) => {
          this.setState({ registerFeedback: response.data.err });
        });
    } catch (error) {
      this.setState({ registerFeedback: error });
    }
  };

  handleLogout = () => {
    try {
      logic.logout();
      this.props.history.push("/login");
    } catch (error) {
      this.setState({ registerFeedback: error });
    }
  };

  handleChangeHeader = () => {
    this.setState({ loginFeedback: null, registerFeedback: null });
  };

  componentDidMount() {
    const token = logic.getStoredtoken();
    if (!token) {
      this.props.history.push("/login");
    } else {
      logic.getPlayerById(token).then(response => {
        this.setState({ player: response });
      });
    }
  }

  render() {
    const {
      handleLogin,
      handleLogout,
      handleRegister,
      handleSetAvailable,
      handleSetUnavailable,
      handleChangeHeader
    } = this;
    const { loginFeedback, registerFeedback } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <main className={styles.body}>
          <Header
            onLogout={handleLogout}
            navigation={this.props}
            onHeaderChange={handleChangeHeader}
          />
          <div>
            <Route
              path="/register"
              render={() => (
                <RegisterPlayer
                  onRegister={handleRegister}
                  feedback={registerFeedback}
                />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Login onLogin={handleLogin} feedback={loginFeedback} />
              )}
            />
            <Route
              path="/home"
              render={() =>
                logic.isPlayerLoggedIn() ? (
                  <Home
                    handleSetAvailable={handleSetAvailable}
                    handleSetUnavailable={handleSetUnavailable}
                    playerlogged={this.state.player}
                  />
                ) : (
                  <Redirect to={{ pathname: "/login" }} />
                )
              }
            />
            <Route
              exact
              path="/"
              render={() => <Redirect to={{ pathname: "/home" }} />}
            />
            <Route path="/players" component={Ranking} />
          </div>
        </main>
      </MuiThemeProvider>
    );
  }
}
export default withRouter(App);
