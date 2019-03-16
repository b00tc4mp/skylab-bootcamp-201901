import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  isInvalidForm = () => {
    const {
      name,
      surname,
      email,
      password,
      passwordConfirm,
      link
    } = this.props;
    return (
      !name ||
      !surname ||
      !email ||
      !password ||
      !passwordConfirm ||
      !link ||
      (password && password !== passwordConfirm)
    );
  };

  render() {
    const { classes } = this.props;
    const { isInvalidForm } = this;

    return (
      <section>
        <Button
          variant="contained"
          color="primary"
          type={"submit"}
          disabled={isInvalidForm()}
          onClick={this.handleOpen}
        >
          Register
        </Button> 
        <div>
          <Modal
            aria-labelledby=""
            aria-describedby="Succesfully registered"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Succesfully registered!
              </Typography>
            </div>
          </Modal>
        </div>
      </section>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
