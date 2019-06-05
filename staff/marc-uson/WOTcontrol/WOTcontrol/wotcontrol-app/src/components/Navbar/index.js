import React from 'react'
import logo from '../../assets/images/logoGreen.png'

function Navbar({onLogout}){


    return <>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <img src={logo} width="61" height="60" />
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <select>
                        <p>Add device</p>
                    </select>
                </div>

                <div class="navbar-end">
                    <a class="navbar-item">
                        Profile
                    </a>
                    <div class="navbar-item">
                        <a onClick={onLogout}>Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar