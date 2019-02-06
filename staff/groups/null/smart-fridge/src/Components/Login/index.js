import React from 'react'
import './index.sass'

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterButton = event => {
        event.preventDefault()

        this.props.loginToRegister()
    }

    render() {
        return <section className="login">
                <div className="login__box container pl-lg-5 pr-lg-5">
                    <h2 className="col-2 mt-3">Login</h2>
                    <form onSubmit={this.handleFormSubmit} className="form-group container mb-3 " >
                        <div className="row">
                            <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                            <input onChange={this.handleEmailInput} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                            <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                            <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                            {/* {this.props.feedback && <Feedback message={this.props.feedback} />} */}
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3 col-0"></div>
                            <button type="submit" className="btn btn-dark col-12 col-sm-6">Login</button>
                            <div className="p-0 pt-2 pt-sm-0 pl-sm-2 col-12 col-sm-6 col-md-3">
                                <button onClick={this.handleRegisterButton} href="#" className="btn btn-outline-light col-12">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
        </section>
    }
}

export default Login