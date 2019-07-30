import React from 'react'
import logic from '../../logic'
import Search from '../Search'

function Landing({ literals, selectedLanguage, onLoginNav, onRegisterNav }) {
  function handleLoginNav(e) {
    e.preventDefault();
    onLoginNav();
  }
  
  function handleRegisterNav(e) {
    e.preventDefault();
    onRegisterNav();
  }
  
  return (
    <section className="landing">
      <img
        className="landing__image"
        src="https://media.tenor.com/images/4f8eca353a4e30bb521b06e19da01e04/tenor.gif"
      />
      <div className="landing__actions">
        <a className="btn landing__login" onClick={handleLoginNav} href="">
          {literals[selectedLanguage].login}
        </a>
        <span className="landing__middleText">
          {literals[selectedLanguage].or}
        </span>
        <a
          className="btn btn--small landing__register"
          onClick={handleRegisterNav}
          href=""
        >
          {literals[selectedLanguage].register}
        </a>
      </div>
    </section>
  );
}

export default Landing