import React from "react";
import { withRouter  } from 'react-router-dom'
import logo from '../../assets/img/logo.png'



function Navbar({history}) {
  return (
    <nav class='navbar' role='navigation' aria-label='main navigation'>
      <div class='navbar-brand'>
        <a class='navbar-item' href='https://bulma.io'>
          <img src={logo}  />
        </a>
        <a
          role='button'
          class='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div id='navbarBasicExample' class='navbar-menu has-background-grey-lighter'>
        <div class='navbar-start'>
          <a class='navbar-item'>Home</a>

          <a class='navbar-item'>Documentation</a>

          <div class='navbar-item has-dropdown is-hoverable'>
            <a class='navbar-link'>More</a>

            <div class='navbar-dropdown'>
              <a class='navbar-item'>About</a>
              <a class='navbar-item'>Jobs</a>
              <a class='navbar-item'>Contact</a>
              <hr class='navbar-divider' />
              <a class='navbar-item'>Report an issue</a>
            </div>
          </div>
        </div>

        <div class='navbar-end'>
          <div class='navbar-item'>
            <div class='buttons'>
              <a class='button is-primary' onClick={(e) => history.push('/register')}>
                <strong>Sign up</strong>
              </a>
              <a class='button is-light' onClick={(e) => history.push('/login')}>Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
