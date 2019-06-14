import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import literals from "./literals";
import "./index.css";
import logo from "../../assets/logo/icon_v2_white.png";

function Register({ lang, onRegister, onLangChange, error, onClearError }) {
  const { title, subtitle, name, surname, email, password, enter } = literals[lang];

  function handleSubmit(e) {
    e.preventDefault();

    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password }
    } = e.target;

    onRegister(name, surname, email, password);
  }

  useEffect(() => {
    onClearError();
  }, []);

  const { home } = literals[lang];

  return (
    <section className="bg-register">
      <div className="uk-position-top">
        <nav className="uk-navbar-container  uk-navbar-transparent" data-uk-navbar>
          <div className="uk-margin-top">
            <ul className="uk-navbar-nav">
              <li className="uk-margin-left uk-margin-right">
                <img src={logo} alt="logo-PhotoPin" width="60" height="60" />
              </li>
              <li className="uk-margin-top uk-margin-left">
                <h1 className="white-title">{title}</h1>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li className="uk-active">
                <Link to="/home">{home}</Link>
              </li>
              <li className={lang !== "en" ? "uk-active" : ""}>
                <a onClick={() => onLangChange("en")}>en</a>
              </li>
              <li className={lang !== "es" ? "uk-active" : ""}>
                <a onClick={() => onLangChange("es")}>es</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="uk-position-center  uk-card uk-card-default uk-card-body card-transparent">
        <h2 className="uk-text-center">{subtitle}</h2>
        <form className="uk-form-stacked" onSubmit={handleSubmit}>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-large"
                id="form-stacked-text"
                type="text"
                name="name"
                placeholder={name}
                required
              />
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-large"
                id="form-stacked-text"
                type="text"
                name="surname"
                placeholder={surname}
                required
              />
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-large"
                id="form-stacked-text"
                type="email"
                name="email"
                placeholder={email}
                required
              />
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-large"
                id="form-stacked-text"
                type="password"
                name="password"
                placeholder={password}
                required
              />
            </div>
          </div>
          <button className="uk-button default-button uk-text-bold uk-width-1-1">{enter}</button>
          {error && (
            <div className="uk-margin">
              <div className="alert">
                <span className="alert-closebtn" onClick={() => onClearError()}>
                  &times;
                </span>
                {error}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Register;
