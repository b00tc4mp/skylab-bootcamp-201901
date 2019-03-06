import React, { Component } from "react";

class RegisterPlayer extends Component {
  state = {
    name: null,
    surname: null,
    email: null,
    password: null,
    passwordConfirm: null,
    preferedPosition: null,
    link: null
  };

  handleNameInput = event => this.setState({ name: event.target.value });

  handleSurnameInput = event => this.setState({ surname: event.target.value });

  handleEmailInput = event => this.setState({ email: event.target.value });

  handlePasswordInput = event =>
    this.setState({ password: event.target.value });

  handlePasswordConfirmInput = event =>
    this.setState({ passwordConfirm: event.target.value });

  handlePreferedPositionInput = event =>
    this.setState({ preferedPosition: event.target.value });

  handleLinkInput = event => this.setState({ link: event.target.value });

  handleRegisterSubmit = event => {
    event.preventDefault();

    const {
      state: {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        preferedPosition,
        link
      }
    } = this;

    const {
      props: { onRegister }
    } = this;
    onRegister(
      name,
      surname,
      email,
      password,
      passwordConfirm,
      preferedPosition,
      link
    );
  };
  render() {
    const {
      handleRegisterSubmit,
      handleNameInput,
      handleSurnameInput,
      handleEmailInput,
      handlePasswordInput,
      handlePasswordConfirmInput,
      handlePreferedPositionInput,
      handleLinkInput
    } = this;
    return (
      <section className="register">
        <form onSubmit={handleRegisterSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              onChange={handleNameInput}
              placehoder="name"
            />
          </label>
          <label>
            Surname
            <input
              type="text"
              name="surname"
              onChange={handleSurnameInput}
              placehoder="surname"
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="email"
              onChange={handleEmailInput}
              placehoder="email"
            />
          </label>
          <label>
            Password
            <input
              type="text"
              name="password"
              onChange={handlePasswordInput}
              placehoder="password"
            />
          </label>
          <label>
            Password Confirmation
            <input
              type="text"
              name="passwordConfirm"
              onChange={handlePasswordConfirmInput}
              placehoder="passwordConfirm"
            />
          </label>
          <label>
            Prefered Position
            <input
              type="text"
              name="preferedPosition"
              onChange={handlePreferedPositionInput}
              placehoder="preferedPosition"
            />
          </label>
          <label>
            Link
            <input
              type="text"
              name="link"
              onChange={handleLinkInput}
              placehoder="link"
            />
          </label>
          <button>Register</button>
        </form>
      </section>
    );
  }
}

export default RegisterPlayer;
