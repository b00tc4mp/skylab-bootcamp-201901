'use strict';

(() => {
    const { Component } = React
    const Feedback = modules.import('feedback')

    class Register extends Component {
        state = { email: '', password: '' }

        handleNameInput = event => this.setState({ name: event.target.value })

        handleSurnameInput = event => this.setState({ surname: event.target.value })

        handleEmailInput = event => this.setState({ email: event.target.value })

        handlePasswordInput = event => this.setState({ password: event.target.value })

        handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

        handleFormSubmit = event => {
            event.preventDefault()

            const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

            onRegister(name, surname, email, password, passwordConfirmation)
        }

        handleGoToLogin = event => {
            event.preventDefault()

            this.props.onGoToLogin()
        }

        render() {
            const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleFormSubmit, handleGoToLogin, props: { title, feedback } } = this

            return <section className="register">
                <h2>{title}</h2>

                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="name" onChange={handleNameInput} placeholder="name" required />
                    <input type="text" name="surname" onChange={handleSurnameInput} placeholder="surname" required />
                    <input type="email" name="email" onChange={handleEmailInput} placeholder="email" required />
                    <input type="password" name="password" onChange={handlePasswordInput} placeholder="password" required />
                    <input type="passwordConfirmation" name="password" onChange={handlePasswordConfirmationInput} placeholder="confirm password" required />
                    <button>Register</button>
                </form>

                {feedback && <Feedback message={feedback} level="warn" />}

                Go to <a href="#" onClick={handleGoToLogin}>Login</a>
            </section>
        }
    }

    modules.export('register', Register)
})()