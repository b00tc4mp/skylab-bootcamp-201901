import React from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'

function Landing(props) {

  return (
    <section className="landing">
      <img
        className="landing__image"
        src="https://media.tenor.com/images/4f8eca353a4e30bb521b06e19da01e04/tenor.gif"
      />
      <div className="landing__actions">
        <Link className="btn landing__login" to="/login">
          Login
        </Link>
        <span className="landing__middleText">
          or
        </span>
        <Link
          className="btn btn--small landing__register"
          to="/register"
        >
          Register
        </Link>
      </div>
    </section>
  );
}

export default Landing