import React, { Component } from 'react'
import { Route, withRouter} from 'react-router-dom' 
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

    handleGoToFavorites = event => {
        event.preventDefault()
        this.setState({ loginFeedback: null, registerFeedback: null})
        this.props.history.push('/favorites')
    }

    handleGoToHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    render() {
        const {handleGoToRegister, handleGoToLogin, handleGoToFavorites, handleGoToHome, props: {onLogout}} = this
        return ( 
            <nav className="topbar navbar is-fullwidth" role="navigation" aria-label="main navigation">
                <div className="topbar__inner container inner-container">
                <div className="navbar-brand">
                    <a className="navbar-item" onClick={handleGoToHome} href="#">
                    <span className="logo">UNDEFINED<span className="films">films</span></span>
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                    <div className="buttons">
                        <Route path='/' render={() => !logic.userLoggedIn && <button className="button is-info is-outlined" onClick={handleGoToRegister}>Register</button>} />
                        <Route path='/' render={() => !logic.userLoggedIn && <button className="button is-primary is-outlined" onClick={handleGoToLogin}>Login</button>} /> 
                        <Route path='/' render={() => logic.userLoggedIn && <button className="button is-light" onClick={onLogout}>Logout</button>} />
                        <Route path='/' render={() => logic.userLoggedIn && <button className="button is-light" onClick={handleGoToFavorites}>Favorites</button>} />
                    </div>
                    </div>
                </div>
                </div>
          </nav>
        )
    }
}

export default withRouter(Topbar)