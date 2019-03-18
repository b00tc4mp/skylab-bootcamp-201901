import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import styles from "./index.module.scss";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = props;

  const handleSubmit = event => {
    event.preventDefault();
    onLogin(email, password);
  };

  const isInvalidForm = () => {
    return (
      !email ||
      !password
    );
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          className={styles.inputContainer}
          label="Email"
          margin="normal"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          className={styles.inputContainer}
          label="Password"
          type={"password"}
          margin="normal"
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isInvalidForm()}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
