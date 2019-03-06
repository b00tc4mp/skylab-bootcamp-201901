import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logic from '../../logic'


class SignedIn extends Component {
    state = {
        user: {},
        categories: []

    }

    render() {
        return (
            <ul className="right">
                <li><Link to='/profile'>Profile</Link></li>
                <li> <button onClick={() => { logic.logout() }}>Log Out</button></li>
            </ul>

        )
    }

}

export default SignedIn