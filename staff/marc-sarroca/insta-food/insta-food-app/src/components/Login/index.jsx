import React, { useState, useContext } from "react";
import { UserContext } from "../../userContext";
import Feedback from "../Feedback";
import "./index.sass";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userError, login } = useContext(UserContext);
  const [loginFeedback, setLoginFeedback] = useState(null);

  const handleEmailInput = event => setEmail(event.target.value);
  const handlePasswordInput = event => setPassword(event.target.value);
  const handleFormSubmit = e => {
    e.preventDefault();
    try {
      login(email, password);
    } catch ({ message }) {
      setLoginFeedback(message);
    }
  };

  return (
    <section className="login">
      <h2 className="page-title">Login</h2>
      <div>
        <form className="form-login-register" onSubmit={handleFormSubmit}>
          <input type="text" name="email" onChange={handleEmailInput} />
          <input
            type="password"
            name="password"
            onChange={handlePasswordInput}
          />
          <button>Login</button>
        </form>
      </div>
      {loginFeedback && <Feedback message={loginFeedback} />}
      {userError && <Feedback message={userError} />}
    </section>
  );
}
export default Login;
