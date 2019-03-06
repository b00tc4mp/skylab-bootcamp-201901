import React, { Component } from 'react'
import Menu from '../Menu'

import './index.sass';

class Header extends Component {
    render() {
        return<header className="header">
            <p>HEADER</p>
            <Menu />
        </header>
    }
}

export default Header