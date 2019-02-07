import React from 'react'
import './index.sass'
import logo from '../images/logo.png'


class Nav extends React.Component {

    handleOnLogout =event => {
        event.preventDefault()

        this.props.onLogout()
    }

    handleEditProfile =event => {
        event.preventDefault()

        this.props.editProfile()
    }

    handleOnInputs =()=>{
        this.props.editInputs()
    }


    render() {
        return <nav className="navbar container">
                <img src={logo}  alt='logo' className="navbar-brand logo" ></img>
                {this.props.results && <button className="btn btn-outline-light inline inputs pb-2 pt-2" onClick={this.handleOnInputs}>Back to Inputs</button>}
                <button className="navbar-toggler btn btn-dark active p-3" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    {JSON.parse(sessionStorage.getItem('user')).name}
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mt-3">
                        <li className="nav-item ">
                            <a  onClick={this.handleEditProfile} className="nav-link text-right nav__link" href="#">Edit Profile </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={this.handleOnLogout} className="nav-link text-right nav__link" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

    }
}

export default Nav
