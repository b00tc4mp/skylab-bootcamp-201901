"use strict";

import React, { useState, useEffect, useRef } from "react";
import { Route, withRouter, Link, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import TopFifty from "../TopFifty";
import NoResults from "../NoResults";

const App = ({ history }) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (logic.isUserLoggedIn) getUsernameLogged();
    }, []);

    const notify = message => {
        toast.dismiss()
        toast.error(message)
    };

    const getUsernameLogged = async () => {
        try {
            const user = await logic.retrieveUserInfo();
            setUsername(user.username);
        } catch (error) {
            notify(error.message);
        }
    };

    const searchFocus = useRef(null);
    
    return (
        <div className="main">
            <div className="navbar-tablet">
                <Aside searchFocus={searchFocus} />
            </div>

            <div className="container">
                <Header searchFocus={searchFocus} />

                <div className="content">
        <ToastContainer />
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

                        <Route
                            exact
                            path="/logout"
                            render={() => {
                                logic.logOutUser();
                                sessionStorage.clear();
                                return <Redirect to="/" />;
                            }}
                        />
                        <Route exact path="/ranking" component={TopFifty} />
                        <Route exact path="/random" component={Random} />
                        <Route exact path='/noresults' component={NoResults} />
                        <Route path="/:username" component={UserProfile} />
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
