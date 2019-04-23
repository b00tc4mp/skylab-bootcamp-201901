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