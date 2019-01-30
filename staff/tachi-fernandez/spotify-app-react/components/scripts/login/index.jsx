
class Login extends React.Component {
    state = { email: '', password: '' }

    handleLoginEmail = event => this.setState({ email: event.target.value })
    handleLoginPassword = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }


    render() {

        const { handleLoginEmail, handleLoginPassword, props: { onGoToSearch, onGoToRegister, feedback } } = this

        return <section className="login">
            <h3>Login</h3>
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" onChange={handleLoginEmail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={handleLoginPassword} />
                </div>
                <button type="submit" onClick={onGoToSearch}>Login</button>
                <a className="link" onClick={onGoToRegister} href="#">Register</a>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>


    }
}