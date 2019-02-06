import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Header extends Component {

    render() {
        const { props: { user, onLogout } } = this

        return <header className="hero is-small is-black">
            <div className="hero-body">
                <div className="container is-pulled-left">
                    <h1 className="title">HANGOUT<i class="fas fa-circle first"></i><i class="fas fa-circle second"></i><i class="fas fa-circle third"></i></h1>
                </div>
     {!!user && <div className="navbar-end header-icons">
                    <Link className="navbar-item" to="/home/user" name="userInfo">{user.name}</Link>
                    <a className="navbar-item" onClick={onLogout} name="logOut">Logout</a>
                </div>
                }
            </div>
        </header >

    }
}

export default Header
