import React, { Component } from 'react'
import Search from '../Search'
import './index.sass'

class Header extends Component {

    _showAside = () => {
        const overlay = document.querySelector('.sidebar-overlay')
        const aside = document.querySelector('.sidebar')
        overlay.className = 'sidebar-overlay sidebar-overlay--show'
        aside.className = 'sidebar sidebar--show'
    }

    
    render() {

        return <section>
            <header className="header">
                <button className="header__btn" onClick={() => this._showAside()}>
                    <i className="fas fa-bars" />
                </button>
                <Search onSearch={this.props.onSearch}/>
                <button className="header__btn1">
                <i className="fas fa-cogs"></i>
                </button>
            </header>
        </section>
    }
}
export default Header