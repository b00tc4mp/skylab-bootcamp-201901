import React, { Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logic from "../../logic";
import "./index.sass";

const Login = ({ history }) => {
    const [userData, setUserData] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleUserDataInput = ({ target: { value: userData } }) => {
        setUserData(userData);
    };

    const handleUserPasswordInput = ({ target: { value: userPassword } }) => {
        setUserPassword(userPassword);
    };

    const notify = message => {
        toast.dismiss();
        toast.error(message);
    };

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            logic
                .loginUser(userData, userPassword)
                .then(() => {
                    history.push("/");
                })
                .catch(error => {
                    notify(error.message);
                });
        } catch ({ message }) {
            notify(message);
        }
    };

    return (
        <Fragment>
            <div className="landing-page">
                <div className="header">
                    <h1 className="header__title">LOGIN</h1>
                </div>
                <div className="forms">
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
