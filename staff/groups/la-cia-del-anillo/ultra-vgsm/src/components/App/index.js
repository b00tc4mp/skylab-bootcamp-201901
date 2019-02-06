import React, { Component } from 'react';

import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';

import Header from '../Header';
import Aside from '../Aside';
import Results from '../Results';
import Footer from '../Footer';
import GameInfo from '../GameInfo';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../NotFound';
import logic from '../../logic';
import Feedback from '../Feedback';

class App extends Component {
    state = { loginFeedback: null, registerFeedback: null };

    handleLogin = (email, password) => {
        try {
            logic
                .loginUser(email, password)
                .then(() => {
                    this.props.history.push('/');
                })
                .catch(error => {this.setState({ loginFeedback: error.message })});
        } catch ({ message }) {
            this.setState({ loginFeedback: message });
        }
    };

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic
                .registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(error => {this.setState({ registerFeedback: error.message })});
        } catch ({ message }) {
            this.setState({ registerFeedback: message });
        }
    };

    handleLogout = () => {
        logic.logout();

        this.props.history.push('/');
    };

    render() {
        const {
            handleLogin,
            handleRegister,
            handleLogout,
            state: { loginFeedback, registerFeedback }
        } = this;

        return (
            <main className="app">
                <Aside onLogout={handleLogout} />
                <div className="wrapper">
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route path="/search/:query" component={Results} />
                            <Route path="/platform/:platformId" component={Results} />
                            <Route path="/game/:gameId" component={GameInfo} />
                            <Route
                                exact
                                path="/login"
                                render={() =>
                                    logic.userLoggedIn ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Login onLogin={handleLogin} feedback={loginFeedback} />
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
                                        <Register
                                            onRegister={handleRegister}
                                            feedback={registerFeedback}
                                        />
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
