'use strict'

import React, {Component} from 'react'
import Feedback from '../Feedback'

class Login extends Component {
    state = {email: null, password: null, feedback: null}

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password}, props: { onLogin } } = this

        onLogin(email, password)
    }
    
    handleOnLanding = event => {
        event.preventDefault()

        const { props: {onLanding} } = this

        onLanding()
    }

    render() {

        const { handleOnLanding, handleEmailInput, handlePasswordInput, handleFormSubmit, props: {feedback, login, goBack, email, password} } = this
        
        return <section className="login container" >
        <div className="columns is-mobile is-centered">
            <div className="column is-half-widescreen is-three-fifths-tablet is-three-quarters-mobile is-centered margin">
                <form className="login__form" onSubmit={handleFormSubmit}>
                    <h4 className="subtitle is-4 white">{login}</h4>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small is-rounded" type="email" name="email" placeholder={email} required onChange={handleEmailInput}/>
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
                            <input className="input is-small is-rounded" type="password" name="password" placeholder={password} required onChange={handlePasswordInput} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div>
                    {feedback && <Feedback message={feedback} />}
                    </div>
                    <div className="field is-grouped btn_grp">
                        <p className="control"><button className="button is-outlined is-danger is-small is-rounded" type="submit">{login}</button></p>
                        <p className="control"><a href='/' onClick={handleOnLanding} className="button is-inverted is-outlined is-danger is-small is-rounded">{goBack}</a></p>
                    </div>
                </form>
            </div>
        </div> 
    </section> 
    }

}

export default Login