import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import logic from "../../logic";
import { withRouter } from "react-router-dom";

class Register extends React.Component {

  state = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    const {name, surname, email, password} = this.state
    logic.registerUser(email, password, name, surname)
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="container">
        <form className="form" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label for="name">Name</label>
            <input className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label for="surname">Surname</label>
            <input className="form-control"
              type="text"
              name="surname"
              id="surname"
              placeholder="surname"
              onChange={this.handleChange}
              value={this.state.surname}
            />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <button className="btn btn-primary btn-block">
            Submit
          </button>
          <Link to="/login" className="btn btn-link">
            Go to login
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Register)