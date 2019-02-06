import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Header extends Component {

    render() {
        const { props: { user, onLogout } } = this

        return <section className="hero is-small is-primary is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Ticket app title
                    </h1>
                    <h2 className="subtitle">
                        Mini ticket app title
                    </h2>
                </div>
                {!!user && <div className="navbar-end">
                    <Link className="navbar-item" to="/home/user" name="userInfo">
                        {user.name}
                    </Link>

                    <a className="navbar-item" onClick={onLogout} name="logOut">
                        Logout
                    </a>
                </div>
                }
            </div>
        </section >

    }
}

export default Header
