import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logic from '../../logic'


class SignedIn extends Component {
    state = {
        user: {},
        categories: []

    }

    logout() {
        logic.logout()
        this.props.onLogout()
    }
    render() {
        return (
            <ul className="right">
                <li><Link to='/profile'>Profile</Link></li>
                <li> <Link to="/" onClick={() => { this.logout() }}>Log Out</Link></li>
            </ul>

        )
    }

}

export default SignedIn