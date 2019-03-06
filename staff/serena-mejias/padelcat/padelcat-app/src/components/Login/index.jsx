import React, { Component } from "react";

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailInput = event => this.setState({ email: event.target.value });

  handlePasswordInput = event =>
    this.setState({ password: event.target.value });

  handleLoginSubmit = event => {
    event.preventDefault();

    const {
      state: { email, password }
    } = this;

    const {
      props: { onLogin }
    } = this;
    onLogin(email, password);
  };

  render() {
    const { handleEmailInput, handlePasswordInput, handleLoginSubmit } = this;

    return (
      <section>
        <h2>Login</h2>

        <form onSubmit={handleLoginSubmit}>
          <label>
            Email
            <input type="text" name="email" onChange={handleEmailInput} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={handlePasswordInput}
            />
          </label>
          <button>Login</button>
        </form>
      </section>
    );
  }
}

export default Login;
