import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Feedback from '../Feedback';

class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '', feedback: null };

    handleInput = Event => {
        this.setState({ [Event.target.name]: Event.target.value });
    };

    handleRegisterSubmit = event => {
        event.preventDefault();

        const {
            state: { name, surname, email, password, passwordConfirm },
            props: { onRegister }
        } = this;

        onRegister(name, surname, email, password, passwordConfirm);
    };

    componentWillReceiveProps(props) {
        const { feedback } = props;
        this.setState({
            feedback
        });
    }

    toggleFeedback = prop => {
        this.setState({
            feedback: prop
        });
    };

    render() {
        const {
            handleRegisterSubmit,
            handleInput,
            toggleFeedback,
            state: { feedback }
        } = this;

        return (
            <Fragment>
                <section className="login">
                    <div className="login__content animated flipInX">
                        <h3 className="login__title">Sign up with your email address</h3>
                        <form onSubmit={handleRegisterSubmit} className="login__form">
                            <div className="login__row">
                                <label htmlFor="name" className="login__label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={handleInput}
                                    className="login__input"
                                />
                            </div>
                            <div className="login__row">
                                <label htmlFor="surname" className="login__label">
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    placeholder="Surname"
                                    onChange={handleInput}
                                    className="login__input"
                                />
                            </div>
                            <div className="login__row">
                                <label htmlFor="email" className="login__label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={handleInput}
                                    className="login__input"
                                />
                            </div>
                            <div className="login__row">
                                <label htmlFor="password" className="login__label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={handleInput}
                                    className="login__input"
                                />
                            </div>
                            <div className="login__row">
                                <label htmlFor="passwordConfirm" className="login__label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    placeholder="confirm password"
                                    onChange={handleInput}
                                    className="login__input"
                                />
                            </div>

                            <button className="login__btn btn btn__green btn__block">
                                Register
                            </button>
                        </form>
                        <div className="divider" />
                        <p className="login__register-text">
                            Do you already have an account? <Link to="/login">Access</Link>
                        </p>
                    </div>
                </section>
                {feedback && <Feedback message={feedback} toggleFeedback={toggleFeedback} />}
            </Fragment>
        );
    }
}

export default Register;
