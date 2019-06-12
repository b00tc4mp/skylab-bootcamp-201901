import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import logic from "../../logic";
import NavCard from "../NavCard";

import './index.sass'

function Navbar({ history, quantity }) {

  return (
    <nav className='navbar is-danger' aria-label='main navigation'>
      <div className='navbar-brand is-danger'>
        <a className='navbar-item' onClick={() => history.push("/")}>
          
          <img className="logo" src={logo} />
        </a>
      </div>

      <div className='navbar-menu is-danger'>
        <div className='navbar-start'>

        </div>

        <div >
          <div className='navbar-item'>
            <div >
              {!logic.isUserLoggedIn ? <div className='navbar-end'>
                <a className='navbar-item is-size-5' onClick={e => history.push("/register")}>
                  <strong>Sign up</strong>
                </a>
                <a className='navbar-item navbar-item is-size-5' onClick={e => history.push("/login")}>
                  Log in
                </a>
                </div>
                :
                <div className='navbar-end  '>
                <NavCard quantity={quantity} />
                <a className='navbar-item navbar-item is-size-5' onClick={e => history.push("/login")}>
                  Profile
                </a>
                <a
                  className='navbar-item navbar-item is-size-5'
                  onClick={e => logic.logOut()}>
                  LogOut
                </a>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
