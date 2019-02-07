import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom' 
import logic from '../../logic';

import './index.sass'

class Topbar extends Component {

    state = { loginFeedback: null, registerFeedback: null }

    handleGoToRegister = event => {
        event.preventDefault()
        this.setState({ loginFeedback: null, registerFeedback: null})
        this.props.history.push('/register')
    }
    
    handleGoToLogin = event => {
        event.preventDefault()
        this.setState({ loginFeedback: null, registerFeedback: null})
        this.props.history.push('/login')
    }

    render() {
        const {handleGoToRegister, handleGoToLogin, props: {onLogout, user}} = this
        return ( 
            <nav className="topbar navbar is-fullwidth" role="navigation" aria-label="main navigation">
                <div className="topbar__inner container inner-container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="undefined logo"/>
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                    <div className="buttons">
                        <Route path='/' render={() => !user && <button className="button is-primary" onClick={handleGoToRegister}>Register</button>} />
                        <Route path='/' render={() => !user && <button className="button is-light" onClick={handleGoToLogin}>Login</button>} /> 
                        <Route path='/' render={() => user && <button className="button is-light" onClick={onLogout}>Logout</button>} /> 
                    </div>
                    </div>
                </div>
                </div>
          </nav>
        )
    }
}

export default withRouter(Topbar)