import React, { Component } from 'react'
import Search from '../Search'
import './index.sass'
import logic from '../../logic'


class Header extends Component {

    handleLogout =() =>  {

        const { props: { onLogout } } = this

        onLogout()
    }

    render() {

        const { handleLogout, props: { onSearch, onGoToLogin } } = this

        return <header className="header">
            <i className="fas fa-bars"></i>
            <img className="header__logo" src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c545.png" />
            <h3 className="header__title">TuTubo</h3>
            <Search onSearch={onSearch} />
            {!logic.userLoggedIn && <a className="header__button" onClick={onGoToLogin}>Login to Sesson</a>}

{logic.userLoggedIn && <div className="drp">
                <div class="dropdown is-right is-hoverable">
                    <div class="dropdown-trigger">
                        <button class="button drp__button" aria-haspopup="true" aria-controls="dropdown-menu4">
                            <span class="icon is-small">
                                <i className="fas fa-user"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a onClick={handleLogout} href="#" class="dropdown-item drp__link">
                                    Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </header>
    }
}


export default Header