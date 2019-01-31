import React , {Component} from 'react'
import Feedback from '../Feedback'




class Register extends Component {
    state = { name: '', surname: '', email: '', password: '', confirmPassword: '' }

    handleRegisterSurname = event => this.setState({ surname: event.target.value })
    handleRegisterEmail = event => this.setState({ email: event.target.value })
    handleRegisterName = event => this.setState({ name: event.target.value })
    handleRegisterPassword = event => this.setState({ password: event.target.value })
    handleRegisterConfirmPassword = event => this.setState({ confirmPassword: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { name, surname, email, password, confirmPassword }, props: { onRegister } } = this
        onRegister(name, surname, email, password, confirmPassword)
    }


    render() {

        const { handleRegisterName, handleRegisterSurname, handleLoginEmail, handleLoginPassword, handleLoginConfirmPassword, props: { onGoToLogin, feedback } } = this

        return <section className="register">
            <h3>Register</h3>
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="name" onChange={handleRegisterName} />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="surname" onChange={handleRegisterSurname} />
                </div>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" onChange={handleLoginEmail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={handleLoginPassword} />
                </div>
                <div className="form-group">
                    <label>ConfirmPassword</label>
                    <input type="confirmPassword" onChange={handleLoginConfirmPassword} />
                </div>
                <button type="submit"  >Register</button>
                <a href="#" onClick={onGoToLogin} >Login</a>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default Register
