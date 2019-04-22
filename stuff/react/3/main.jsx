const { Component } = React

function Login(props) {
    function handleSubmit(event) {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        props.onLogin(username, password)
    }

    return <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
        <span>{props.error}</span>
    </form>
}

function Home(props) {
    return <main>
        <h1>Hello, {props.name}!</h1>
    </main>
}

class App extends Component {
    state = { loggedIn: false, loginError: null, userName: null }

    handleLogin = (username, password) => {
        const loggedIn = logic.loginUser(username, password)

        // if (!loggedIn)
        //     this.setState({ loginError: 'wrong credentials' })
        // else 
        //     this.setState({ loggedIn })

        this.setState(loggedIn ? { loggedIn, userName: logic.retrieveUser().name } : { loginError: 'wrong credentials' })
    }

    render() {
        return [
            !this.state.loggedIn && <Login onLogin={this.handleLogin} error={this.state.loginError} />,
            this.state.loggedIn && <Home name={this.state.userName} />
        ]
    }
}

ReactDOM.render(<App />, document.getElementById('root'))