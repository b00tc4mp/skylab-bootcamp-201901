import React from 'react'
import logo from '../../common/img/logo.png';

function Navbar({ onHome,onProfile, onPlaces, onTrackings, onLogout, onDarkMode, error }) {


document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

return (
<nav className="nav-home navbar is-warning">
  <div className="navbar-brand">
    <a className="navbar-item">
      <img src={logo} alt="TorToise GPS" width="100" height="40"/>
    </a>
    <div className="navbar-burger burger" data-target="navibarmenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    </div>
  

  <div id="navibarmenu" className="navbar-menu is-warning">
    <div className="navbar-start">
      <a className="navbar-item" onClick={()=>onHome()}>
        Home
      </a>
      <div className="navbar-start">
        <a className="navbar-item" onClick={()=>onProfile()}>
          Profile
        </a>
      </div>
      <div className="navbar-start">
        <a className="navbar-item" onClick={()=>onPlaces()}>
          Places
        </a>
      </div>
      <div className="navbar-start">
        <a className="navbar-item" onClick={()=>onTrackings()}>
          Trackers
        </a>
      </div>

    </div>

    <div className="navbar-end">
    <div className="field">
      <div className="navbar-item">
            <a className="button is-dark is-outlined is-rounded" onClick={()=>onDarkMode()}>
              <span>Dark Map</span>
            </a>
        </div>
      </div>
      <div className="field">
      <div className="navbar-item">
            <a className="button is-dark is-outlined is-rounded" onClick={()=>onLogout()}>
              <span>Log Out</span>
            </a>
        </div>
      </div>
      </div>
    </div>
</nav>

)
}

export default Navbar