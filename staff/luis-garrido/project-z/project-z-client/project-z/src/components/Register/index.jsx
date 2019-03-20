import React, { Fragment, useState } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logic from "../../logic";
import "./index.sass";

// import Feedback from "../Feedback";

const Register = props => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [feedbackRegister, setFeedbackRegister] = useState('')

    const notify = message => {
        toast.dismiss()
        toast.error(message)
    };

    const handleUsername = ({ target: { value: username } }) => {
        setUsername(username);
    };

    const handleEmail = ({ target: { value: email } }) => {
        setEmail(email);
    };

    const handleName = ({ target: { value: name } }) => {
        setName(name);
    };

    const handleSurname = ({ target: { value: surname } }) => {
        setSurname(surname);
    };

    const handlePassword = ({ target: { value: password } }) => {
        setPassword(password);
    };

    const handlePasswordConfirmation = ({
        target: { value: passwordConfirmation }
    }) => {
        setPasswordConfirmation(passwordConfirmation);
    };

    const handleRegisterSubmit = event => {
        event.preventDefault();

        try {
            logic
                .registerUser(
                    username,
                    name,
                    surname,
                    email,
                    password,
                    passwordConfirmation
                )
                .then(() => {
                    props.history.push("/login");
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
                    <h1 className="header__title">REGISTER</h1>
                </div>
                {feedbackRegister && feedbackRegister}
                <div className="forms">
                    <form
                        className="register-form"
                        onSubmit={handleRegisterSubmit}
                    >
                        <input
                            className="register-form__input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            autoComplete="off"
                            autoCorrect="off"
                            autoFocus
                            spellCheck="false"
                            required
                            onChange={handleUsername}
                        />
                        <input
                            className="register-form__input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            onChange={handleEmail}
                        />
                        <input
                            className="register-form__input"
                            type="text"
                            name="name"
                            placeholder="Name"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            onChange={handleName}
                        />
                        <input
                            className="register-form__input"
                            type="text"
                            name="surname"
                            placeholder="Surname"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            onChange={handleSurname}
                        />
                        <input
                            className="register-form__input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            onChange={handlePassword}
                        />
                        <input
                            className="register-form__input"
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Password confirmation"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            required
                            onChange={handlePasswordConfirmation}
                        />
                        <button className="register-form__button">
                            Register
                        </button>
                    </form>
                    <p>
                        Do you have an account?{" "}
                        <Link to="/login">SIGN IN!</Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Register);
