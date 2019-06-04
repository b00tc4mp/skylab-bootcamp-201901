import React, { useState } from 'react';


function Navbar({ goHome, goProfile, goMytickets, goAlerts, goScanTicket }) {



    return <>

        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" onClick={goHome}>Home</a>
                    <a class="navbar-item" onClick={goProfile}>Profile</a>
                    <a class="navbar-item" onClick={goScanTicket}>Scan Ticket</a>
                    <a class="navbar-item" onClick={goMytickets}>My Tickets</a>
                    <a class="navbar-item" onClick={goAlerts}>My Alerts</a>
                    <div class="navbar-end"></div>
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">
                                <strong>Log Out</strong>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    </>
}

export default Navbar