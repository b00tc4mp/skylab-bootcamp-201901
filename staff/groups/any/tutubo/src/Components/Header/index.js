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

        const { handleLogout, props: { onSearch, onGoToLogin, onModeSwitch, mode } } = this

        return <header className={`${mode ? `header header-light` : 'header header-dark'}`}>
            <i className={`${mode ? 'fas fa-bars fa-bars-light' : 'fas fa-bars fa-bars-dark'}`}></i>
            <a className="youtubeIcon" href="#"><i className='fab fa-youtube fa-3x'/></a>
            <h3 className={`${mode ? 'header__title header__title-light' : 'header__title header__title-dark'}`}>TuTubo</h3>
            <Search onSearch={onSearch} mode={this.props.mode}/>
            {!logic.userLoggedIn && <a className="header__button" onClick={onGoToLogin}>Login to Sesson</a>}
            {logic.userLoggedIn && <div className="drp">
                <div class="dropdown is-right is-hoverable">
                    <div class="dropdown-trigger">
                        <button class="button drp__button" aria-haspopup="true" aria-controls="dropdown-menu4">
                            <span class="icon is-small">
                                <i className={`${mode ? 'fas fa-user fa-user-light' : 'fas fa-user fa-user-dark'}`}></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a onClick={handleLogout} href="#" class="dropdown-item drp__link">Logout</a>
                                <a onClick={onModeSwitch}>Change Mode</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </header>
    }
}


export default Header