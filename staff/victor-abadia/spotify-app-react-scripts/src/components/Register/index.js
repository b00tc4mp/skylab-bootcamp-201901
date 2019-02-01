import React, { Component } from 'react';

class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleName = (event) => {
        const name = event.target.value
        this.setState({ name })
    }

    handleSurname = (event) => {
        const surname = event.target.value
        this.setState({ surname })
    }

    handleEmail = (event) => {
        const email = event.target.value
        this.setState({ email })
    }

    handlePasword = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handlePasswordConfirmation = (event) => {
        const passwordConfirmation = event.target.value
        this.setState({ passwordConfirmation })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onHandleSubmit(this.state.name, this.state.surname, this.state.email, this.state.password, this.state.passwordConfirmation)
    }

    handlePageChange = (event) => {
        event.preventDefault()
        this.props.changePageFunc()
    }

    render() {
        return <section className="register container col-6">
            <h1 className="title">Spotify App</h1>
            <form className="register__form p-2" onSubmit={this.handleSubmit}>
                <h4 className="font-weight-light-normal">Register</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Name</label>
                    </div>
                    <input className="form-control" type="text" name="name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" required onChange={this.handleName} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Surame</label>
                    </div>
                    <input className="form-control" type="text" name="surname" required onChange={this.handleSurname} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required onChange={this.handleEmail} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="text" name="password" required onChange={this.handlePasword} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Confirm password</label>
                    </div>
                    <input className="form-control" type="text" name="password-confirmation" required onChange={this.handlePasswordConfirmation} />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={this.handlePageChange}><strong>Login</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Register</strong></button>
            </form>
        </section>
    }
}

export default Register;