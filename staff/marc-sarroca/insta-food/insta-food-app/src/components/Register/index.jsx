import React, { useState } from "react";
import Feedback from "../Feedback";
import "./index.sass";
import logic from "../../logic";
import { withRouter } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [registerFeedback, setRegisterFeedback] = useState(null);

  const handleNameInput = event => setName(event.target.value);
  const handleUsernameInput = event => setUsername(event.target.value);
  const handleEmailInput = event => setEmail(event.target.value);
  const handlePasswordInput = event => setPassword(event.target.value);
  const handlePasswordConfirmationInput = event =>
    setPasswordConfirm(event.target.value);

  const handleFormSubmit = event => {
    event.preventDefault();
    try {
      logic
        .registerUser(name, username, email, password, passwordConfirm)
        .then(() => props.history.push("/login"))
        .catch(({ message }) => setRegisterFeedback(message));
    } catch ({ message }) {
      setRegisterFeedback(message);
    }
  };

  return (
    <section className="panel-login-register">
      <h2 className="page-title">Register</h2>

      <form className="form-login-register" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleNameInput}
          placeholder="name"
        />
        <input
          type="text"
          name="username"
          onChange={handleUsernameInput}
          placeholder="username"
        />
        <input
          type="text"
          name="email"
          onChange={handleEmailInput}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          onChange={handlePasswordInput}
          placeholder="password"
        />
        <input
          type="password"
          name="passwordConfirmation"
          onChange={handlePasswordConfirmationInput}
          placeholder="confirm password"
        />

        <button>Register</button>
      </form>

      {registerFeedback && <Feedback message={registerFeedback} />}
    </section>
  );
}
export default withRouter(Register);
