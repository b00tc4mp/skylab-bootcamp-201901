import React from 'react';
import './index.sass'
import logo from '../../images/mainTitlev2.png'


function Navbar({ goHome,
    goProfile,
    goMytickets,
    goMyAlerts,
    goScanTicket,
    goMyEstadistics,
    logOut }) {



    return <>

        <nav class="navbar is-dark is-hidden-mobile"  role="navigation" aria-label="main navigation">

            <div id="navbar" class="navbar-menu">
                <div class="navbar-start">
                    <img class="logo" src={logo}  ></img>
                    <a class="navbar-item" id="home" onClick={goHome}>Home</a>
                    <a class="navbar-item" id="profile" onClick={goProfile}>Profile</a>
                    <a class="navbar-item"  id="scanTicket" onClick={goScanTicket}>Scan Ticket</a>
                    <a class="navbar-item"  id="myTickets" onClick={goMytickets}>My Tickets</a>
                    <a class="navbar-item" id="myAlerts" onClick={goMyAlerts}>My Alerts</a>
                    <a class="navbar-item is-hidden-mobile" id="stadistics" onClick={goMyEstadistics}>Stadistics</a>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons" id="logOutButton">
                                <a class="button is-danger"  id="logout" onClick={logOut}>
                                    <strong>Log Out</strong>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    </>
}

export default Navbar