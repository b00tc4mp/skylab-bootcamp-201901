import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
import styles from "./index.module.scss";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = props;

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Grid item className={styles.container}>
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
          margin="normal"
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </Grid>
  );
};

/*class Login extends Component {
  state = { email: "", password: "" };

  handleEmailInput = event => this.setState({ email: event.target.value });

  handlePasswordInput = event =>
    // esto sería
    // setPassowrd(event.target.value)
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
  }
}*/

export default Login;
