import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import styles from "./index.module.scss";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Feedback from "../Feedback";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = props;

  const handleSubmit = event => {
    event.preventDefault();
    onLogin(email, password);
  };

  const isInvalidForm = () => {
    return !email || !password;
  };
  const { feedback } = props;
  return (
    <div className={styles.container}>
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
      {feedback && <Feedback message={feedback} />}
    </div>
  );
};

export default Login;
