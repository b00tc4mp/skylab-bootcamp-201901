const { Component } = React

class Login extends Component {
    state = { error: null }

    handleSubmit = event => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        const loggedIn = logic.login(username, password)

        if (!loggedIn)
            this.setState({ error: 'wrong credentials' })
        else this.props.onLogin()
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <button>Login</button>
            <span>{this.state.error}</span>
        </form>
    }
}

function Home(props) {
    return <main>
        <h1>Hello, {props.name}!</h1>
    </main>
}

class App extends Component {
    state = { loggedIn: false }

    render() {
        return [<Login onLogin={() => this.setState({ loggedIn: true })} />, <Home />]
    }
}

ReactDOM.render(<App />, document.getElementById('root'))