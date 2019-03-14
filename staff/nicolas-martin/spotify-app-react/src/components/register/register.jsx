class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordRepeat: '' }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordRepeatInput = event => this.setState({ passwordRepeat: event.target.value })

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { 
                state: {name, surname, email, password, passwordRepeat}, 
                props: { onRegister } 
        } = this
        onRegister(name, surname, email, password, passwordRepeat)
    }

    handleClickToLogin = () => { this.props.registerVisible() }

    render () {
        const {
            handleFormSubmit, 
            handleNameInput, 
            handleSurnameInput,
            handleEmailInput,
            handlePasswordInput,
            handlePasswordRepeatInput,
            handleClickToLogin,
            props: {
                feedback
        }} = this
        return (
            <section className="register">
                <form onSubmit={handleFormSubmit} >
                    <input
                        type="text"
                        name="name"
                        onChange={handleNameInput}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="surname"
                        onChange={handleSurnameInput}
                        placeholder="Surname"
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={handleEmailInput}
                        placeholder="Email"
                    />
                    <input 
                        type="password"
                        name="password"
                        onChange={handlePasswordInput}
                        placeholder="Password"
                    />
                    <input 
                        type="password"
                        name="passwordRepeat"
                        onChange={handlePasswordRepeatInput}
                        placeholder="Repeat Password"
                    />
                    <button>Register</button>
                </form>
                <a href="#" onClick={handleClickToLogin}>Login</a>
                {feedback && <Feedback message={feedback} level='warn' />}
            </section>
        )
    }
}