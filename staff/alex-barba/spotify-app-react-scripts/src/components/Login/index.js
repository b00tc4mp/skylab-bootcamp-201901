import React from 'react';
import Feedback from '../Feedback';

class Login extends React.Component {
    state = {email: '', password: ''}

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password}, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleOnRegister = () => {
        const { props: {onToRegister} } = this

        onToRegister()
    }

    render(){

        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleOnRegister, props: {feedback} } = this
        
        return <section className="login container margin-top" >
        <div className="columns is-mobile is-centered">
            <form className="login__form column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered" onSubmit={handleFormSubmit}>
                <h4 className="subtitle is-4">Login</h4>
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
                        <input className="input is-small is-rounded" type="password" name="password" placeholder="Password" required onChange={handlePasswordInput} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                        Login
                        </button>
                    </p>
                    <p className="control"
                        ><a href="#" onClick={handleOnRegister} className="button is-outlined is-small is-rounded" >Register</a>
                    </p>
                </div>
            </form>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section> 
    }
}

export default Login;