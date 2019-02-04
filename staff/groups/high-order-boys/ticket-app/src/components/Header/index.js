import React, { Component } from 'react'


class Header extends Component {
    render() {

        return <section className="hero is-medium is-primary is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Ticket app title
        </h1>
                    <h2 className="subtitle">
                        Mini ticket app title
        </h2>
                </div>
                <div className="navbar-end">
                    <a className="navbar-item is-active" name="userInfo">
                        User Info
            </a>
                    <a display="none" className="navbar-item" name="logOut">
                        LogOut
            </a>
                </div>
            </div>
        </section>

    }

}

export default Header;