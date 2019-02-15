import React, { Component } from "react";
import "./index.sass";

class Login extends Component {
  state = { email: "", password: "" };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLoginSubmit = event => {
    event.preventDefault();

    const {
      state: { email, password },
      props: { onLogin }
    } = this;

    onLogin(email, password);
  };

  handleClickRegisterButton = event => {
    event.preventDefault(); 
    const {
      props: { onClickRegisterButton }
    } = this;
    onClickRegisterButton();
  };

  render() {
    const {
      handleChange,
      handleLoginSubmit,
      handleClickRegisterButton
    } = this;

    return (
      <section className="login">
        <div className="login__content">
          <h3 className="login__title">
            Para continuar, inicia sesión en Skytify.
          </h3>
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="login__input"
              />
            </div>

            <button className="login__btn btn btn__green btn__block">
              Login
            </button>
          </form>
          <div className="divider" />
          <p className="login__register-text">
            No tienes cuenta? haz click <a href="#" onClick={handleClickRegisterButton}>aquí</a>
          </p>
        </div>
      </section>
    );
  }
}

export default Login;
