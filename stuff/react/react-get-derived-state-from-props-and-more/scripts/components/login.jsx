'use strict';

(() => {
    const { Component } = React
    const Feedback = modules.import('feedback')

    class Login extends Component {
        state = { email: '', password: '' }

        handleEmailInput = event => this.setState({ email: event.target.value })

        handlePasswordInput = event => this.setState({ password: event.target.value })

        handleFormSubmit = event => {
            event.preventDefault()

            const { state: { email, password }, props: { onLogin } } = this

            onLogin(email, password)
        }

        handleGoToRegister = event => {
            event.preventDefault()

            this.props.onGoToRegister()
        }

        render() {
            const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleGoToRegister, props: { title, feedback } } = this

            return <section className="login">

                <form onSubmit={handleFormSubmit}>
                    <h2>{title}</h2>
                    <input type="email" name="email" onChange={handleEmailInput} placeholder="email" required />
                    <input type="password" name="password" onChange={handlePasswordInput} placeholder="password" required />
                    <button>Login</button>
                </form>

                {feedback && <Feedback message={feedback} level="warn" />}

                Go to <a href="#" onClick={handleGoToRegister}>Register</a>
            </section>
        }
    }

    modules.export('login', Login)
})()