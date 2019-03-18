import React, { Fragment, useState } from "react";
import { Route, withRouter, Link } from "react-router-dom";

import logic from "../../logic";
import "./index.sass";

// import Feedback from "../Feedback";

const Login = props => {
    const [userData, setUserData] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [feedbackLogin, setFeedbackLogin] = useState('')

    const handleUserDataInput = ({ target: { value: userData } }) => {
        setUserData(userData);
    };

    const handleUserPasswordInput = ({ target: { value: userPassword } }) => {
        setUserPassword(userPassword);
    };

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            logic
                .loginUser(userData, userPassword)
                .then(() => {
                    props.history.push("/");
                })
                .catch(error => {
                    setFeedbackLogin(error.message);
                });
        } catch ({ message }) {
            setFeedbackLogin(message);
        }
    };

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">LOGIN</h1>
                </div>
                <div className="forms">
                    {feedbackLogin && <h2>{feedbackLogin}</h2>}
                    <form className="login-form" onSubmit={handleLoginSubmit}>
                        <div>
                            <input
                                className="login-form__input"
                                type="text"
                                name="userData"
                                placeholder="Username or email"
                                autoComplete="off"
                                autoCorrect="off"
                                autoFocus
                                spellCheck="false"
                                required
                                onChange={handleUserDataInput}
                            />
                        </div>
                        <div>
                            <input
                                className="login-form__input"
                                type="password"
                                name="userPassword"
                                placeholder="Password"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                                required
                                onChange={handleUserPasswordInput}
                            />
                        </div>
                        <div>
                            <button className="login-form__button">
                                Login
                            </button>
                        </div>
                    </form>
                        <p>
                            Don't you have an account?{" "}
                            <Link to="/register">JOIN US!</Link>
                        </p>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Login);
