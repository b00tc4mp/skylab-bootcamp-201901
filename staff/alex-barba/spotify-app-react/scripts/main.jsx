class Banner extends React.Component {

    render() {
        return <section className="hero is-light is-bold">
        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">
                        🎶 Spotify App 🎧
                </h1>
            </div>
        </div>
    </section>
    }
}


class Login extends React.Component {
    state = {email: '', password: '', loginVisibale: true}

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password}, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleOnRegister = event => {
        event.preventDefault()

        const { props: {onToRegister} } = this

        onToRegister()
    }



    render(){

        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleOnRegister, props: {feedback, } } = this
        
        return <section className="login container" >
        <div className="columns">
            <form className="login__form column is-half is-offset-one-quarter" onSubmit={handleFormSubmit}>
                <h4 className="subtitle is-4">Login</h4>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={handleEmailInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password" placeholder="Password" required onChange={handlePasswordInput} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                        Login
                        </button>
                    </p>
                    <p className="control"
                        ><a href="#" onClick={handleOnRegister} className="button is-outlined is-small is-rounded" >Register</a>
                    </p>
                </div>
            </form>
            {feedback && <Feedback message={feedback} />}
        </div>
    </section>
       
    }
}

class Register extends React.Component {
    state = {registerVisible: false}

    handleOnLogin = event => {
        event.preventDefault()

        const { props: {onToLogin} } = this

        onToLogin()
    }

    render() {
         const { handleOnLogin } = this
    
        return <section className="register container">
        <div className="columns">
            <form className="register__form column is-half is-offset-one-quarter">
                <h4 className="subtitle is-4">Register</h4>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="text" name="name" placeholder="Name" required />
                        <span className="icon is-small is-left">
                            <i className="far fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input is-small is-rounded" type="text" name="surname" placeholder="Surame" required />
                    <span className="icon is-small is-left">
                        <i className="far fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password"placeholder="Password" required />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password-confirmation"placeholder="Confirm password" required />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                        Register
                        </button>
                    </p>
                    <p className="control">
                        <a href="#" onClick={handleOnLogin} className="button is-outlined is-small is-rounded">
                        Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </section>

    }
}

function Feedback( {message} ) {
    return <div className="columns">
    <div className="column is-half is-offset-one-quarter is-centered button is-small is-inverted is-danger">
    {message}
    </div>
</div>
}

class App extends React.Component {

    state = {loginFeedback: '', registerVisible: false, loginVisible: true }

    handleLogin = (email, password) =>{
        try {
            logic.login(email, password, user => {
                // User to be sent to search panel
                console.log(user)
                this.setState({loginFeedback: ''})
            })
            
        } catch ({message}) {
            this.setState({ loginFeedback: message })
            
        }
    }

    handleLoginToRegister= () => {
        this.setState({registerVisible : true})
        this.setState({loginVisible : false})
    }

    handleRegisterToLogin = () => {
        this.setState({registerVisible : false})
        this.setState({loginVisible : true})
    }

    render() {
        const { state: { loginFeedback, registerVisible, loginVisible}, handleLogin, handleLoginToRegister, handleRegisterToLogin } = this

        return <main>
        <Banner />
        {loginVisible? <Login onLogin={handleLogin} feedback={loginFeedback} onToRegister={handleLoginToRegister}/> : null }
        {registerVisible ? <Register onToLogin={handleRegisterToLogin}/>  : null }
    </main>
        
    }
}

ReactDOM.render(<App />, document.getElementById('root'))