import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";
import "./index.sass";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const handleEmailInput = event => setEmail(event.target.value);
  const handlePasswordInput = event => setPassword(event.target.value);
  const handleFormSubmit = e => {
    e.preventDefault();
    try {
      login(email, password);
    } catch ({ message }) {
      notify(message);
    }
  };

  const notify = message => toast.warn(message);

  return (
    <section className="panel-login-register">
      <h2 className="page-title">Login</h2>
      <div>
        <form className="form-login-register" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="email"
            onChange={handleEmailInput}
            placeholder="email"
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            onChange={handlePasswordInput}
          />
          <button>Login</button>
          <span>
            Not registered? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </section>
  );
}
export default Login;
