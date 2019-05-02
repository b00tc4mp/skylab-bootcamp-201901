import React from 'react';
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
    const afterGoTo = this.props.match.params.afterGoTo;
    const { email, password } = this.state;
    logic.loginUser(email, password).then(res => {
      if (res === true) {
        if (afterGoTo) {
          this.props.history.push('/' + afterGoTo)
        } else this.props.history.push('/home')
      }
      else this.setState({ error: res });
    });
  };

  render() {
    const afterGoTo = this.props.match.params.afterGoTo;
    return (
      <div className="container">
        {this.state.error && <h2>{this.state.error}</h2>}
        <form onSubmit={this.handleSubmit}>
          <div className ="form-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password" />
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
        <Link to={"/register/" + afterGoTo} className="btn btn-link">
          Go to register
        </Link>
      </div >
    );
  }
}

export default withRouter(Login);
