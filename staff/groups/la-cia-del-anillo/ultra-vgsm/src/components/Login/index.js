import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import Feedback from '../Feedback';

class Login extends Component {
    state = { email: '', password: '', feedback: null };

    handleInput = Event => {
        this.setState({ [Event.target.name]: Event.target.value });
    };

    handleLoginSubmit = Event => {
        Event.preventDefault();

        const {
            state: { email, password },
            props: { onLogin }
        } = this;

        onLogin(email, password);
    };

    componentWillReceiveProps(props) {
        const { feedback } = props;
        this.setState({
            feedback
        });
    }

    toggleFeedback = (prop) => {
        this.setState({
            feedback: prop
        });
    };

    render() {
        const {
            handleLoginSubmit,
            handleInput,
            toggleFeedback,
            state: { feedback }
        } = this;

        return (
            <Fragment>
                <section className="login">
                    <div className="login__content animated flipInX">
                        <h3 className="login__title">Inicia sesión en ULTRAVGSM.</h3>
                        <form onSubmit={handleLoginSubmit} className="login__form">
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

                            <button className="login__btn btn btn__green btn__block">Login</button>
                        </form>
                        <div className="divider" />
                        <p className="login__register-text">
                            No tienes cuenta? haz click <Link to="/register">aquí</Link>
                        </p>
                    </div>
                </section>
                {feedback && <Feedback message={feedback} toggleFeedback={toggleFeedback} />}
            </Fragment>

        );
    }
}

export default Login;
