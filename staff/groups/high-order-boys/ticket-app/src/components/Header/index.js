import React, { Component } from 'react'
import { Link } from 'react-router-dom'




class Header extends Component {


    render() {
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
                <div className="navbar-end">
                    <a className="navbar-item" name="userInfo">
                        User Info
            </a><div>

                    </div>
                    <a className="navbar-item" name="logOut">
                        <Link to="/Login/">Logout</Link>
                    </a>

                </div>

            </div>
        </section>

    }

}

export default Header
