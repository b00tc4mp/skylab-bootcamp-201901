import React from 'react'
import './index.sass'


export default function SideMenu() {
    return (<div className="column is-4-tablet is-3-desktop is-2-widescreen hero is-fullheight is-dark is-hidden-touch side">
        <nav className="side--menu menu">
            <ul className="menu-list side--list">
                <li>
                    <a href="dashbord.html">
                        <span className="icon">
                            <i className="side--icons fas fa-tachometer-alt"></i>
                        </span>
                        Dashbord
                    </a>
                </li>
                <li>
                    <a href="dashbord.html">
                        <span className="icon">
                            <i className="side--icons fas fa-plane"></i>
                        </span>
                        Drones
                    </a>
                </li>
                <li>
                    <a href="dashbord.html">
                        <span className="icon">
                            <i className="side--icons fas fa-globe-americas"></i>
                        </span>
                        Flights
                    </a>
                </li>
            </ul>
        </nav>
    </div>)


}