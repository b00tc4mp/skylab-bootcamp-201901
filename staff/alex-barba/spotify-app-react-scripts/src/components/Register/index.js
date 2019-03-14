import React from 'react';
import Feedback from '../Feedback';

class Register extends React.Component {
    state = {name:'', surname:'', email:'', password:'', passwordConfirmation:''}

    handleNameInput = event => this.setState({name: event.target.value})

    handleSurnameInput = event => this.setState({surname: event.target.value})

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handlePasswordConfirmationInput = event => this.setState({passwordConfirmation: event.target.value})

    handleOnRegistration = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation}, props: {onRegistration} } = this

        onRegistration(name, surname, email, password, passwordConfirmation)
    }

    handleOnLogin = () => {
        const { props: {onToLogin} } = this

        onToLogin()
    }

    render() {
         const { handleOnLogin, handleOnRegistration, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, props: {feedback}  } = this
    
        return <section className="register container margin-top">
        <div className="columns is-mobile is-centered">
            <form onSubmit={handleOnRegistration} className="register__form column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered">
                <h4 className="subtitle is-4">Register</h4>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="text" name="name" placeholder="Name" required onChange={handleNameInput} />
                        <span className="icon is-small is-left">
                            <i className="far fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input is-small is-rounded" type="text" name="surname" placeholder="Surame" required onChange={handleSurnameInput} />
                    <span className="icon is-small is-left">
                        <i className="far fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={handleEmailInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password"placeholder="Password" required onChange={handlePasswordInput} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password-confirmation"placeholder="Confirm password" required onChange={handlePasswordConfirmationInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                        Register
                        </button>
                    </p>
                    <p className="control">
                        <a href="#" onClick={handleOnLogin} className="button is-outlined is-small is-rounded">
                        Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section>
    }
}

export default Register;