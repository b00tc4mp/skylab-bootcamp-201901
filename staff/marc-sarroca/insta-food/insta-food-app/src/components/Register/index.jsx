import React, { useState } from "react";
import "./index.sass";
import logic from "../../logic";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Register(props) {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

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
        .catch(({ message }) => notify(message));
    } catch ({ message }) {
      notify(message);
    }
  };

  const notify = message => toast.warn(message);

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
    </section>
  );
}
export default withRouter(Register);
