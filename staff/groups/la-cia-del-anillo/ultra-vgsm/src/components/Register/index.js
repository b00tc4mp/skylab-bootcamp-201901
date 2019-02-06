import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Feedback from '../Feedback';

class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '' };

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

    render() {
        const {
            handleRegisterSubmit,
            handleInput,
            props: { feedback }
        } = this;

        return (
            <section className="login animated flipInX">
                <div className="login__content">
                    <h3 className="login__title">
                        Regístrate con tu dirección de correo electrónico
                    </h3>
                    <form onSubmit={handleRegisterSubmit} className="login__form">
                        <div className="login__row">
                            <label htmlFor="name" className="login__label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nombre"
                                onChange={handleInput}
                                className="login__input"
                            />
                        </div>
                        <div className="login__row">
                            <label htmlFor="surname" className="login__label">
                                Apellidos
                            </label>
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                placeholder="Apellidos"
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
                                placeholder="Confirmar password"
                                onChange={handleInput}
                                className="login__input"
                            />
                        </div>

                        <button className="login__btn btn btn__green btn__block">Register</button>
                    </form>
                    <div className="divider" />
                    <p className="login__register-text">
                        ¿Ya tienes cuenta? <Link to="/login">Entra</Link>
                    </p>
                </div>
                {feedback && <Feedback message={feedback} />}
            </section>
        );
    }
}

export default Register;
