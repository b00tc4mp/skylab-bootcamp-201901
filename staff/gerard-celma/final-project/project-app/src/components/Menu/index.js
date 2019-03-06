import React, { Component } from 'react'
import './index.sass'

class Menu extends Component {
    render() {
        return <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                <a href="#"><li>Login</li></a>
                <a href="#"><li>Register</li></a>
                </ul>
            </div>
            </nav>
    }
}

export default Menu