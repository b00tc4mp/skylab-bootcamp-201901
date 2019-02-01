import React from 'react'

class Register extends React.Component {

    state = { name: '', surname: '', email: '', password: '', confirmPassword: '' }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnamedInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleConfirmPasswordInput = event => this.setState({ confirmpassword: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, confirmPasword }, props: { onRegister } } = this

        onRegister(name, surname, email, password, confirmPasword )
    }

    handleLoginLink = event => {
        event.preventDefault()

        this.props.registerToLogin()
    }

    render() {
        return <section className="welcome">
            <section className="login__margins">
                <div className="login container pl-lg-5 pr-lg-5">
                    <h2 className="col-2 mt-3">Register</h2>
                    <form onSubmit={this.handleFormSubmit} className="login__form form-group container mb-3 " >
                        <div className="row">
                            <label htmlFor="name" className="col col-md-3 col-sm-12 flex mt-1">Name</label>
                            <input onChange={this.handleNameInput} type="text" className="col col-md-9 col-12 htmlForm-control mt-1" name="name" placeholder="Name" required />
                            <label htmlFor="surname" className="col col-md-3 col-sm-12 flex mt-1">Surname</label>
                            <input onChange={this.handleSurnameInput} type="text" className="col col-md-9 col-12 htmlForm-control mt-1" name="surname" placeholder="Surname" required />
                            <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                            <input onChange={this.handleEmailInput} type="email" className="col col-md-9 col-12 htmlForm-control mt-1" name="email" placeholder="Email" required />
                            <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                            <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                            <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Confirm Password</label>
                            <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="confirmPassword" placeholder="Confirm Password" required />
                            {/* {this.props.feedback && <Feedback message={this.props.feedback} />} */}
                        </div>
                        <div className="row login-flex mt-3">
                            <div className="col-md-3 col-0"></div>
                            <button type="submit" className="btn btn-dark col-12 col-sm-6 mr-2">Register</button>
                            <div className="pt-2 pt-sm-0">
                                <a onClick={this.handleLoginLink} href="#" className="btn btn-outline-secondary login__register-link ">Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    }

}

export default Register