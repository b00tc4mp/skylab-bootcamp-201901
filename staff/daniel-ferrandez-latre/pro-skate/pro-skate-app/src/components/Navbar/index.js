import React , {useState} from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import logic from "../../logic";
import NavCard from '../NavCard'

function Navbar({ history, userLogged, quantity}) {
const [userName, setUserName] = useState('')


/* userLogged() */

  return (
    <nav class='navbar' role='navigation' aria-label='main navigation'>
      <div class='navbar-brand'>
        <a class='navbar-item' href='https://bulma.io'>
          <img src={logo} />
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

            { logic.isUserLoggedIn && <NavCard quantity={quantity}/>}
            <div class='buttons'>
              {!logic.isUserLoggedIn && (
                <a class='button is-primary' onClick={e => history.push("/register")}>
                  <strong>Sign up</strong>
                </a>
              )}
              {!logic.isUserLoggedIn && (
                <a class='button is-light' onClick={e => history.push("/login")}>
                  Log in
                </a>
              )}
                <p>{userName}</p>
              {logic.isUserLoggedIn && (
                <a class='button is-light' onClick={e => history.push("/login")}>
                  Profile
                </a>
              )}
              {logic.isUserLoggedIn && (
                <a class='button is-light' onClick={e => {
                  logic.logOut()
                  history.push("/landing")
                  
                  }}>
                  LogOut
                </a>
              )}
              {logic.isUserLoggedIn && (
                <a class='button is-light' onClick={e => history.push("/login")}>
                  Orders
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
