import React, { Component } from 'react'
import Search from '../Search'
import './index.sass'

class Header extends Component {

    render() {
        return <section>
            <header className="header">
                <button className="header__btn">
                    <i className="fas fa-bars" />
                </button>
                <Search />
                <button className="header__btn1">
                <i className="fas fa-cogs"></i>
                </button>
            </header>
        </section>
    }
}
export default Header