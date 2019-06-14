import React from "react";
import { Link } from "react-router-dom";
import "./index.sass";
import logo from "../../images/logo.png";

function HomePage() {
  return (
    <section className="home">
      <div className="home-container">
        <h1 className="home-title">Welcome to InstaFoddie</h1>
        <img className="logo-home" src={logo} alt="logo" />
        <div className="login-register">
          <div className="login">
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
          <div className="register">
            <Link className="link" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
