import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
  state = {
    name: '',
    surname: '',
    email: '',
    password: '',
    error: null,
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const afterGoTo = this.props.match.params.afterGoTo;
    const { email, password, name, surname } = this.state;
    try {
      logic
        .registerUser(email, password, name, surname)
        .then(() => logic.loginUser(email, password))
        .then(res => {
          if (!res.message) {
            if (afterGoTo) {
              this.props.history.push('/' + afterGoTo);
            } else this.props.history.push('/');
          } else throw Error(res);
        })
        .catch(error => {
          this.setState({ error: error.message });
          setTimeout(() => this.setState({ error: null }));
        });
    } catch (error) {
      this.setState({ error: error.message });
      setTimeout(() => this.setState({ error: null }));
    }
  };

  render() {
    const afterGoTo = this.props.match.params.afterGoTo;
    return (
      <div className="container mt-5">
        {this.state.error && (
          <div className="alert alert-warning" role="alert">
            {this.state.error}
          </div>
        )}
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              className="form-control"
              type="text"
              name="surname"
              id="surname"
              placeholder="surname"
              onChange={this.handleChange}
              value={this.state.surname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <button className="btn btn-primary btn-block">Submit</button>
          <Link to={'/login/' + afterGoTo} className="btn btn-link">
            Go to login
          </Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
