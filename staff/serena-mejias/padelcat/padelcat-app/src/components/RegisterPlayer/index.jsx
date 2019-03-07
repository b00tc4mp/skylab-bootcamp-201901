import React, { Component, useState } from "react";

import styles from "./index.module.scss";
import { Button, TextField } from "@material-ui/core";

const RegisterPlayer = props => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [preferedPosition, setPreferedPosition] = useState(null);
  const [link, setLink] = useState(null);

  const handleNameInput = e => setName(e.target.value);
  const handleSurnameInput = e => setSurname(e.target.value);
  const handleEmailInput = e => setEmail(e.target.value);
  const handlePasswordInput = e => setPassword(e.target.value);
  const handlePasswordConfirmInput = e => setPasswordConfirm(e.target.value);
  const handlePreferedPositionInput = e => setPreferedPosition(e.target.value);
  const handleLinkInput = e => setLink(e.target.value);

  const handleRegisterSubmit = e => {
    const { onRegister } = props;
    e.preventDefault();
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

  const isInvalidForm = () => {
    return (
      !name ||
      !surname ||
      !email ||
      !password ||
      !preferedPosition ||
      !link ||
      (password && password !== passwordConfirm)
    );
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleRegisterSubmit}>
        <TextField
          className={styles.inputContainer}
          label="Name"
          margin="normal"
          onChange={handleNameInput}
          required={true}
        />
        <TextField
          className={styles.inputContainer}
          label="Surname"
          margin="normal"
          onChange={handleSurnameInput}
          required={true}
        />
        <TextField
          className={styles.inputContainer}
          label="Email"
          type={"email"}
          margin="normal"
          onChange={handleEmailInput}
          required={true}
        />
        <TextField
          className={styles.inputContainer}
          label="Password"
          type={"password"}
          margin="normal"
          onChange={handlePasswordInput}
          required={true}
        />
        <TextField
          className={styles.inputContainer}
          label="PasswordConfirm"
          type={"password"}
          margin="normal"
          onChange={handlePasswordConfirmInput}
          required={true}
        />
        <TextField
          className={styles.inputContainer}
          label="Link"
          margin="normal"
          onChange={handleLinkInput}
          required={true}
        />

        <label className={styles.label}>
          Prefered Position
          <select onChange={handlePreferedPositionInput}>
            <option value={"Left"}>Left</option>
            <option value={"Right"}>Right</option>
            <option value={"Both"}>Both</option>
          </select>
        </label>

        <Button
          variant="contained"
          color="primary"
          type={"submit"}
          disabled={isInvalidForm()}
        >
          Register
        </Button>
      </form>
    </section>
  );
};

export default RegisterPlayer;
