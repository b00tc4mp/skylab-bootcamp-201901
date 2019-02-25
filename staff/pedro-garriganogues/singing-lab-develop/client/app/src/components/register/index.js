import React, { Component } from 'react'
import swal from 'sweetalert2'
import logic from '../../logic'
import './index.css'

class Register extends Component {

  constructor() {
    super()
    this.state = {
      isLogged: false,
      isRegistered: false,
      name: '',
      surname: '',
      address: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }


  handleSubmitRegister = (e) => {
    e.preventDefault()

    const { name, surname, address, email, password, passwordConfirm } = this.state
    if (password === passwordConfirm) {
      if (name !== "" || surname !== "" || address !== "" || email !== "" || password !== "") {

        logic.registerUser(name, surname, address, email, password)
          .then(res => {
              this.props.history.push('/auth')
              swal('You signed up successfully')

          }).catch(err => swal(err.message))
      }
    }
  }

  handlerCapturingName = (e) => {
    this.setState({ name: e.target.value })
  }

  handlerCapturingSurname = (e) => {
    this.setState({ surname: e.target.value })
  }

  handlerCapturingAddress = (e) => {
    this.setState({ address: e.target.value })
  }

  handlerCapturingEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  handlerCapturingPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  handlerCapturingPasswordConfirm = (e) => {
    this.setState({ passwordConfirm: e.target.value })
  }


  render() {
    return (
      <main className="my_container register-app">
        <div className="container">
          <div className="py-5 text-center title">
            <h2>Register</h2>
          </div>

          <div className="main-container">
            <form className="form-register" onSubmit={this.handleSubmitRegister} noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" className="form-control" name="name" placeholder="name" autoFocus="" onChange={this.handlerCapturingName} value={this.state.name} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" className="form-control" name="surname" placeholder="surname" onChange={this.handlerCapturingSurname} value={this.state.surname} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username">Address</label>
                <div className="input-group">
                  <input type="text" className="form-control" name="address" placeholder="address" onChange={this.handlerCapturingAddress} value={this.state.address} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Password</label>
                <input type="password" className="form-control" name="password" placeholder="password" onChange={this.handlerCapturingPassword} value={this.state.password} />
              </div>
              <div className="mb-3">
                <label htmlFor="address2">Confirm password</label>
                <input type="password" className="form-control" name="passwordConfirm" placeholder="password confirm" onChange={this.handlerCapturingPasswordConfirm} value={this.state.passwordConfirm} />
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block register-submit" type="submit">Continue to Login</button>
            </form>
          </div>
        </div>

      </main>

    )
  }
}

export default Register