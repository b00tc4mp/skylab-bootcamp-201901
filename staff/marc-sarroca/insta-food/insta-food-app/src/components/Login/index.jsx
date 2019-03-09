import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Feedback from "../Feedback";
import useUser from "../../logic/user";
import "./index.sass";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, error } = useUser();

  const handleEmailInput = event => setEmail(event.target.value);
  const handlePasswordInput = event => setPassword(event.target.value);
  const handleFormSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (user) return <Redirect to="/profile" />;

  return (
    <section className="login">
      <h2>Login</h2>
      <div className="login-container">
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="email" onChange={handleEmailInput} />
          <input
            type="password"
            name="password"
            onChange={handlePasswordInput}
          />
          <button>Login</button>
        </form>
      </div>
      {error && <Feedback message={error} level="warn" />}
    </section>
  );
}
export default Login;
