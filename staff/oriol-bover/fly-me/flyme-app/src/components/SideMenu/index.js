import React from 'react'
import { Link } from 'react-router-dom'
import './index.sass'


export default function SideMenu({ user }) {

    return (<div className="column is-4-tablet is-3-desktop is-2-widescreen hero is-fullheight is-dark is-hidden-touch side">
        <nav className="side--menu menu">
            {user && <ul className="menu-list side--list">
                <li>
                    <a href="dashbord.html">
                        <span className="icon">
                            <i className="side--icons fas fa-tachometer-alt"></i>
                        </span>
                        Dashbord
                    </a>
                </li>
                <li>
                    <Link to={`/admin/drones`}>
                        <span className="icon">
                            <i className="side--icons fas fa-plane"></i>
                        </span>
                        Drones
                    </Link>
                </li>
                <li>
                    <Link to={`/admin/user/${user.id}/flights`}>
                        <span className="icon">
                            <i className="side--icons fas fa-globe-americas"></i>
                        </span>
                        Flights
                    </Link>
                </li>
            </ul>}
        </nav>
    </div>)


}