import * as React from "react";
import styles from "./Header.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import logic from "../../logic";

export const Header = props => {
  const handleOnClick = event => {
    event.preventDefault();
    props.onLogout();
    props.onHeaderChange();
  };

  const { onHeaderChange } = props;
  return (
    <div className={styles.container}>
      <AppBar position="static" color="primary">
        <Toolbar className={styles.toolbar}>
          <div className={styles.title}>
            <img
              className={styles.icon}
              src="https://image.flaticon.com/icons/svg/434/434113.svg"
            />
            <Typography variant="h6" color="inherit" className={styles.grow}>
              <NavLink to={"/home"}>Padelcat</NavLink>
            </Typography>
          </div>
          <div className={styles.buttons}>
            {logic.isPlayerLoggedIn() &&
              props.navigation.location.pathname === "/home" && (
                <NavLink to={"/players"} className={styles.button}>
                  <Button className={styles.button} color="inherit">
                    Ranking
                  </Button>
                </NavLink>
              )}
            {logic.isPlayerLoggedIn() &&
              props.navigation.location.pathname === "/players" && (
                <NavLink to={"/home"} className={styles.button}>
                  <Button color="inherit">Home</Button>
                </NavLink>
              )}
            {logic.isPlayerLoggedIn() &&
              props.navigation.location.pathname === "/player" && (
                <NavLink to={"/home"} className={styles.button}>
                  <Button color="inherit">Player</Button>
                </NavLink>
              )}
            {logic.isPlayerLoggedIn() && (
              <Button
                className={styles.button}
                color="inherit"
                onClick={handleOnClick}
              >
                Logout
              </Button>
            )}
            {!logic.isPlayerLoggedIn() &&
              props.navigation.location.pathname === "/login" && (
                <NavLink to={"/register"} className={styles.button} onClick={onHeaderChange}>
                  <Button color="inherit">Register</Button>
                </NavLink>
              )}
            {!logic.isPlayerLoggedIn() &&
              props.navigation.location.pathname === "/register" && (
                <NavLink
                  to={"/login"}
                  className={styles.button}
                  onClick={onHeaderChange}
                >
                  <Button color="inherit">Login</Button>
                </NavLink>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
