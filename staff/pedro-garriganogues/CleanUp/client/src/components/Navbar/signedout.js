import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'



class SignedOut extends Component {
    state = {
        user: {},
        categories: []

    }


    render() {
        return (
            <ul className="right">
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Log In</Link></li>
            </ul>

        )
    }

}

export default SignedOut