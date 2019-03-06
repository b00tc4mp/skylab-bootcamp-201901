const title = <h1>Hello, world!</h1>

function handleLogin(event) {
    event.preventDefault()

    console.log('login submitted')
}

function LoginPanel(props) {
    return <section>
        <h2>{props.title}</h2>
        <form onSubmit={props.onLogin}>
            <input type="text" name="email" />
            <input type="password" name="password" />
            <button>Login</button>
        </form>
    </section>
}

function App() {
    return <main>
        {title}
        <LoginPanel title="Login form" onLogin={handleLogin} />
    </main>
}

ReactDOM.render(<App />, document.getElementById('root'))