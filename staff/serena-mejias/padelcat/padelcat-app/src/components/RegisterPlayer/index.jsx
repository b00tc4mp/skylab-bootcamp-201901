import React, { useState } from "react";
import Modal from "../Modal";
import styles from "./index.module.scss";
import { TextField, Select, InputLabel, MenuItem } from "@material-ui/core";

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

  
  return (
    <section className={styles.container}>
      <form className={styles.register} onSubmit={handleRegisterSubmit}>
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
        <InputLabel htmlFor="preferred-position">Preferred position</InputLabel>
        <Select onChange={handlePreferedPositionInput} value={preferedPosition}>
          <MenuItem value="">
            <em />
          </MenuItem>
          <MenuItem value={"Left"}>Left</MenuItem>
          <MenuItem value={"Right"}>Right</MenuItem>
          <MenuItem value={"Both"}>Both</MenuItem>
        </Select>
        <Modal name={name} surname={surname} email={email} password={password} passwordConfirm={passwordConfirm} link={link}/>
      </form>
    </section>
  );
};

export default RegisterPlayer;
