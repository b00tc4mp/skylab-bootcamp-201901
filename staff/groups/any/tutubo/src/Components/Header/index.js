import React, {Component} from 'react'
import Search from '../Search'
import './index.sass'
import logic from '../../logic'


class Header extends Component {

    render(){
        
        const { props:{onSearch, onGoToLogin}} = this

        return <header className="header">
            <i className="fas fa-bars"></i>
            <img className="header__logo" src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c545.png"/>
            <h3 className="header__title">TuTubo</h3>
            <Search onSearch={onSearch}/>
            {!logic.userLoggedIn && <a className="header__button" onClick={onGoToLogin}>Login to Sesson</a>}
            {logic.userLoggedIn && <i className="fas fa-user"></i>}
        </header>
    }
}


export default Header