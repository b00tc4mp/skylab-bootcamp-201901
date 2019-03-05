import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'


class SignedIn extends Component {
    state = {
        user: {},
        categories: []

    }


    render() {
        return (
            <ul className="right">
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/'>Log Out</Link></li>
            </ul>

        )
    }

}

export default SignedIn