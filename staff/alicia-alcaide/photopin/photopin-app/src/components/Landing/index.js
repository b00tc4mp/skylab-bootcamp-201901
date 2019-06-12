import React from "react";
import literals from "./literals";
import logo from "../../assets/logo/icon_v2_white.png";
import "./index.css";

function Landing({ lang, onRegister, onLogin, onLangChange }) {
  const { title, subtitle, register, login } = literals[lang];

  return (
    <section className="landing bg-landing">
      <div className="uk-position-top">
        <nav className="uk-navbar-container  uk-navbar-transparent nav-bar medium-margin-top" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li className="uk-margin-left">
                <img src={logo} alt="logo-PhotoPin" width="60" height="60" />
              </li>
              <li className="uk-margin-left">
                <h1 className="white-title">{title}</h1>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li className={lang !== "en" ? "uk-active" : ""}>
                <a className="white-title" onClick={() => onLangChange("en")}>en</a>
              </li>
              <li className={lang !== "es" ? "uk-active" : ""}>
                <a className="white-title" onClick={() => onLangChange("es")}>es</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="uk-position-center">
        <h1 className="uk-tile uk-text-center white-title">{subtitle}</h1>
        <section>
          <button
            className="uk-button white-button uk-text-bold uk-width-1-1 uk-margin-medium-bottom"
            onClick={() => onRegister()}
          >
            {register}
          </button>
          <button className="uk-button white-button uk-text-bold uk-width-1-1" onClick={() => onLogin()}>
            {login}
          </button>
        </section>
      </div>
    </section>
  );
}

export default Landing;
