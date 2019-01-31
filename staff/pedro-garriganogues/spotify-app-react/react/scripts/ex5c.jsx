class App extends React.Component {

    state = { loginVisible: true, registerVisible: false, homePanelVisible: false, loginFeedback: '' }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                this.setState({ loginFeedback: '' })
            })
        } catch ({ message }) {
            //parte de error de panel
            this.setState({ loginFeedback: message })
            console.log("error de login")
        }
    }

    goToRegisterForm = () => {
        this.setState({ loginVisible: false })
        this.setState({ registerVisible: true })
        console.log('ready to change to registerform')
    }

    doRegister = (name, surname, email, password, passwordconf) => {
        //logic
        console.log(name, surname, email, password, passwordconf)
    }

    //{feedback && <Feedback message={feedback} level="warn" />}

    render() {

        const { state: { loginVisible, registerVisible, loginFeedback }, Login, goToRegisterForm, doRegister } = this
        return <main className="App">
            {loginVisible && <Login className="Login" onLogin={handleLogin} feedback={loginFeedback} />}
            {loginVisible && <BotonRegister onRegister={goToRegisterForm} />}
            {registerVisible && <RegisterSection onRegisterUser={doRegister} />}
        </main>
    }

}

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}


class Login extends React.Component {
    state = { email: '', password: '' } //Equivalente al constructor

    //Método HandleLogin
    handleEmailChange = event => this.setState({ email: event.target.value })
    handlePasswordChange = event => this.setState({ password: event.target.value })

    handleSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }


    render() {

        const { handleEmailChange, handlePasswordChange, handleSubmit, props: { feedback } } = this

        return <section>
            <h1> SpotifyApp</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleEmailChange} />
                <input type="password" name="password" onChange={handlePasswordChange} />
                <button type="submit">Login</button>
            </form>

            {feedback && <Feedback message={feedback} level="warn" />}
        </section>
    } //ojo con el this, que si no se pone no funciona por contextos!!!!!!
}



class BotonRegister extends React.Component {
    constructor() {
        super()
    }

    handleRegisterClick = event => {
        event.preventDefault()
        this.props.onRegister()
    }

    render() {
        return <section>
            <button onClick={this.handleRegisterClick}>Register</button>
        </section>
    } //ojo con el this, que si no se pone no funciona por contextos!!!!!!
}


class RegisterSection extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordconf: '', } //Equivalente al constructor

    //Controlan los estados de los inputs y van actualizando el estado que define el objeto
    handleNameChange = event => this.setState({ name: event.target.value })
    handleSurnameChange = event => this.setState({ surname: event.target.value })
    handleEmailChange = event => this.setState({ email: event.target.value })
    handlePasswordChange = event => this.setState({ password: event.target.value })
    handlePwdConfChange = event => this.setState({ passwordconf: event.target.value })

    onSubmitClick = event => {
        event.preventDefault()
        this.props.onRegisterUser(this.state.name, this.state.surname, this.state.email, this.state.password, this.state.passwordconf)
    }


    render() {
        return <section className="register form-row justify-content-center">
            <h2>Welcome to Register Section</h2>
            <form className="row justify-content-center" onSubmit={this.onSubmitClick}>
                <div className="form-group col-7">
                    <label >Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Name" onChange={this.handleNameChange} required />
                </div>
                <div className="form-group col-7">
                    <label >Surname</label>
                    <input type="text" name="surname" className="form-control" placeholder="Surname" onChange={this.handleSurnameChange} required />
                </div>
                <div className="form-group col-7">
                    <label >email</label>
                    <input type="email" className="form-control" placeholder="email" onChange={this.handleEmailChange} required />
                </div>
                <div className="form-group col-7">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="password" onChange={this.handlePasswordChange} required />
                </div>
                <div className="form-group col-7">
                    <label>Password conf</label>
                    <input type="password" name="password-confirmation" className="form-control" placeholder="password conf" onChange={this.handlePwdConfChange} required />
                </div>
                <button type="submit" className="btn btn-primary col-7"><strong>Register</strong></button>
            </form>
        </section>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))