import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import logic from '../../logic';
import { CART_RETRIEVE } from '../../logic/actions';

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
    const afterGoTo = this.props.match.params.afterGoTo;
    const { email, password } = this.state;
    try {
      logic
        .loginUser(email, password)
        .then(res => {
          if (typeof res !== 'string') {
            if (logic.cart.length !== 0) {
              res.cart = [...logic.cart];
              logic.updateUser(res);
            } else {
              logic.dispatch({ action: CART_RETRIEVE });
            }
            if (afterGoTo) {
              this.props.history.push('/' + afterGoTo);
            } else this.props.history.push('/');
          } else throw Error(res);
          return res;
        })
        .catch(error => {
          this.setState({ error: error.message });
          setTimeout(() => this.setState({ error: null }), 4000);
        });
    } catch (error) {
      this.setState({ error: error.message });
      setTimeout(() => this.setState({ error: null }), 4000);
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              id="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" />
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
        </form>
        <Link to={'/register/' + afterGoTo} className="btn btn-link">
          Go to register
        </Link>
      </div>
    );
  }
}

export default withRouter(Login);
