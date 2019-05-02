import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import logic from '../../logic';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: null,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    logic.loginUser(email, password).then(res => {
      if (res === true) this.props.history.push('/home');
      else this.setState({ error: res });
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.error && <h2>{this.state.error}</h2>}
        <form onSubmit={this.handleSubmit}>
          <div className ="form-group">
            <label for="email">Email</label>
            <input className="form-control"
              type="text"
              name="email"
              id="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label for="password" />
            <input className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <button className="btn btn-primary btn-block" >
            Submit
          </button>
        </form>
        <Link to="/register" className="btn btn-link">
          Go to register
        </Link>
      </div >
    );
  }
}

export default withRouter(Login);
