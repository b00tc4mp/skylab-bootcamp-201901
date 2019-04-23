const { Component } = React

class App extends Component {
    state = { loggedIn: false, loginError: null, userName: null }

    handleLogin = (username, password) => {
        const loggedIn = logic.loginUser(username, password)

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