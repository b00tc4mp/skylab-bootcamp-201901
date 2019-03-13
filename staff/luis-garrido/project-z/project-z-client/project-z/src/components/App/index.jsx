"use strict";

import React, { useState, useEffect, useRef } from "react";
import { Route, withRouter, Link, Switch, Redirect } from "react-router-dom";

// import Register from '../Register'
// import Login from '../Login'
// import Home from '../Home'
import logic from "../../logic";
import "./index.sass";

import Aside from "../Aside";
import Header from "../Header";
import Footer from "../Footer";
import LandingPage from "../LandingPage";
import Results from "../Results";
import GameProfile from "../GameProfile";
import Login from "../Login";
import Register from "../Register";
import UserProfile from "../UserProfile";
import Random from "../Random";

const App = ({ history }) => {
    const [loginFeedback, setLoginFeedback] = useState(null);
    const [registerFeedback, setRegisterFeedback] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (logic.isUserLoggedIn) getUsernameLogged();
    }, []);

    const getUsernameLogged = async () => {
        const user = await logic.retrieveUserInfo();
        setUsername(user.username);
    };

    const searchFocus = useRef(null);

    return (
        <div className="main">
            <div className="navbar-tablet">
                <Aside />
            </div>

            <div className="container">
                <Header searchFocus={searchFocus} />

                <div className="content">
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/search/:query" component={Results} />
                        <Route path="/game/:gameId" component={GameProfile} />
                        <Route
                            exact
                            path="/login"
                            render={() =>
                                logic.isUserLoggedIn ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Login />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/register"
                            render={() =>
                                logic.isUserLoggedIn ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Register />
                                )
                            }
                        />
                        <Route path="/user/:username" component={UserProfile} />
                        <Route
                            exact
                            path="/user"
                            render={() =>
                                logic.isUserLoggedIn ? (
                                    <Redirect to={`/user/${username}`} />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/logout"
                            render={() => {
                                logic.logOutUser();
                                sessionStorage.clear();
                                return <Redirect to="/" />;
                            }}
                        />
                        <Route exact patch="/random" component={Random} />
                    </Switch>
                </div>

                <Footer searchFocus={searchFocus} />
            </div>
        </div>
    );
};

export default withRouter(App);

//     {/* <Route path="/register" render={() => <Register title={i18n[selectedLanguage].registerTitle} onRegister={handleRegister} feedback={registerFeedback} />} />
//     <Route path="/login" render={() => <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} feedback={loginFeedback} />} />
// <Route path="/" render={() => logic.isUserLoggedIn ? <Home language={selectedLanguage} /> : <section><Link to="/login">Login</Link> or <Link to="/register">Register</Link></section>} /> */}
