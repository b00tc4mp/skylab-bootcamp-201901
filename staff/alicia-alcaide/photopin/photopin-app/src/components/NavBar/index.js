import React from "react";
import { Link } from "react-router-dom";
import literals from "./literals.js";
import logic from "../../logic";
import logo from "../../assets/logo/icon_v2_black.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function NavBar({ lang, onLogout, onLangChange }) {
  function handleLogout(e) {
    e.preventDefault();
    onLogout();
  }

  const { title, logout, home } = literals[lang];

  return (
    <>
      <nav className="uk-navbar-container  uk-navbar-transparent nav-bar" data-uk-navbar>
        <div className="mini-margin-top">
          <ul className="uk-navbar-nav">
            <li className="uk-margin-left">
              <img src={logo} alt="logo-PhotoPin" width="40" height="40" />
            </li>
            <li className="uk-margin-left">
              <h2>{title}</h2>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <Link to={"/home"}>{home}</Link>
            </li>
            {logic.isUserLoggedIn && (
              <li className="uk-active">
                <a href="#" onClick={handleLogout}>
                  {logout}
                </a>
              </li>
            )}
            <li className={lang !== "en" ? "uk-active" : ""}>
              <a onClick={() => onLangChange("en")}>en</a>
            </li>
            <li className={lang !== "es" ? "uk-active" : ""}>
              <a onClick={() => onLangChange("es")}>es</a>
            </li>
          </ul>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
      </nav>
    </>
  );
}

export default NavBar;
