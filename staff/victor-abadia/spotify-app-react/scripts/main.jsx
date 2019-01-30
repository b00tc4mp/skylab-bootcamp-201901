class Register extends React.Component {
    state = {}

    render() {
        return <section className="register container col-6">
            <form className="register__form p-2">
                <h4 className="font-weight-light-normal">Register</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Name</label>
                    </div>
                    <input className="form-control" type="text" name="name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" required />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Surame</label>
                    </div>
                    <input className="form-control" type="text" name="surname" required />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="text" name="password" required />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Confirm password</label>
                    </div>
                    <input className="form-control" type="text" name="password-confirmation" required />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={() => console.log('go to login')}><strong>Login</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Register</strong></button>
            </form>
        </section>
    }
}

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailChange = (event) => {
        const email = event.target.value
        this.setState({ email }) // this.setState({ email: email })
    }

    handlePasswordChange = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.onHandleSubmit(email, password)
    }

    handlePageChange = (event) => {
        event.preventDefault()
        this.props.laFuncionYea()
    }

    render() {
        return <section className="login container col-6">
            <form className="login__form p-2" onSubmit={this.handleSubmit} >
                <h4 className="font-weight-light-normal">Login</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required onChange={this.handleEmailChange} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="password" name="password" required onChange={this.handlePasswordChange} />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={this.handlePageChange}><strong>Register</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Login</strong></button>
            </form>
        </section>
    }
}

class App extends React.Component {
    state = { loginVisible: true, registerVisible: false }

    handleClickRegisterButton = () => {
        this.setState({ loginVisible: false, registerVisible: true });
      };

    // handleLogin = (thisEmail, thisPassword) => {

    //     try {
    //         logic.login(thisEmail, thisPassword, (user) => {

    //             // TODO this.setState({ user, loginVisible: false })

    //         })
    //     } catch (error) {

    //     }

    // }

    render() {
        return <div>
            {this.state.loginVisible && <Login onHandleSubmit={this.handleLogin} laFuncionYea={this.handleClickRegisterButton} />}
            {this.state.registerVisible && <Register />}
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))