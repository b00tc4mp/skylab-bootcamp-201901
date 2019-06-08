import React from "react";
import literals from "./literals";
import logo from '../../asserts/logo/icon_v2_white.png'
import './index.css'

function WelcomePage({ lang, onLogin }) {

  const { welcome, subtitle, login } = literals[lang];

  return <section className="bg-welcome">
    <div className="uk-position-center">
      <img className="uk-align-center" src={logo} alt="logo-PhotoPin" width="120" height="120" />
      <h1 className='uk-tile uk-text-center uk-padding-small white-title'>{welcome}</h1>
      <h4 className='uk-tile uk-text-center uk-padding-remove white-title'>{subtitle}</h4>
      <section>
        <button className="uk-button white-button uk-text-bold uk-width-1-1" onClick={() => onLogin()}>{login}</button>
      </section>
    </div>
  </section>
}

export default WelcomePage;



// {welcome}{" "}
// {subtitle}{" "}
// <a
//   href=""
//   onClick={e => {
//     e.preventDefault();

//     onLogin();
//   }}
// >
//   {login}
// </a>