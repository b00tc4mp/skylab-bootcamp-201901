import React, { Component } from 'react';

import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';

import Header from '../Header';
import Aside from '../Aside';
import Results from '../Results';
import Footer from '../Footer';
import Games from '../Games';
import GameInfo from '../GameInfo';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../NotFound';
import logic from '../../logic';

class App extends Component {
    handleLogin = (email, password) => {
        try {
            logic.loginUser(email, password).then(() => {
                this.props.history.push('/')
            });
        } catch ({ message }) {
            this.setState({ loginFeedback: message });
        }
    };

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic
                .registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => this.setState({ registerFeedback: '' }));
        } catch ({ message }) {
            this.setState({ registerFeedback: message });
        }
    };

    handleLogout = () => {
        logic.logout()

        this.props.history.push('/')
    }

    render() {
        const { handleLogin, handleRegister, handleLogout } = this;

        return (
            <main className="app">
                <Aside onLogout={handleLogout} />
                <div className="wrapper">
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route path="/search/:query" component={Results} />
                            <Route path="/platform/:platformId" component={Games} />
                            <Route
                                exact
                                path="/login"
                                render={() =>
                                    logic.userLoggedIn ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Login onLogin={handleLogin} />
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
                                        <Register onRegister={handleRegister} />
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
