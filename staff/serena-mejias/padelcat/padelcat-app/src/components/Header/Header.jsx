import * as React from "react";
import styles from "./Header.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export const Header = props => {
  return (
    <div className={styles.container}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" color="inherit" className={styles.grow}>
            <NavLink to={"/home"}>Padelcat</NavLink>
          </Typography>
          <NavLink to={"/login"} className={styles.button}>
            <Button color="inherit">Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};
