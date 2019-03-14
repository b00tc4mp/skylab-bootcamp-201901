import React, { Component } from 'react';

import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';

import Header from '../Header';
import Aside from '../Aside';
import Results from '../Results';
import Favorites from '../Results/Favorites';
import Footer from '../Footer';
import GameInfo from '../GameInfo';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../NotFound';
import logic from '../../logic';
import LandingPage from '../LandingPage';

class App extends Component {
    state = { feedbackLogin: null, feedbackRegister: null };

    handleLogin = (email, password) => {
        try {
            logic
                .loginUser(email, password)
                .then(() => {
                    this.props.history.push('/');
                })
                .catch(error => {
                    this.setState({ feedbackLogin: error.message });
                });
        } catch ({ message }) {
            this.setState({ feedbackLogin: message });
        }
    };

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic
                .registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(error => {
                    this.setState({ feedbackRegister: error.message });
                });
        } catch ({ message }) {
            this.setState({ feedbackRegister: message });
        }
    };

    handleLogout = () => {
        logic.logout();

        this.props.history.push('/');
    };

    // toggleFeedback = (prevProp) => {
    //     console.log(prevProp);
    //     this.setState({
    //         feedback: prevProp
    //     });
    // };

    render() {
        const {
            handleLogin,
            handleRegister,
            handleLogout,
            state: { feedbackLogin, feedbackRegister }
        } = this;

        return (
            <main className="app">
                <Aside onLogout={handleLogout} />
                <div className="wrapper">
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route path="/search/:query" component={Results} />
                            <Route path="/platform/:platformId" component={Results} />
                            <Route
                                exact
                                path="/favorites"
                                render={() =>
                                    !logic.userLoggedIn ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Favorites />
                                    )
                                }
                            />
                            <Route path="/game/:gameId" component={GameInfo} />
                            <Route
                                exact
                                path="/login"
                                render={() =>
                                    logic.userLoggedIn ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Login onLogin={handleLogin} feedback={feedbackLogin} />
                                    )
                                }
                            />
                            <Route
                                exact
                                path="/register"
                                render={() =>
                                    logic.userLoggedIn ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Register onRegister={handleRegister} feedback={feedbackRegister} />
                                    )
                                }
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </main>
        );
    }
}

export default withRouter(App);
