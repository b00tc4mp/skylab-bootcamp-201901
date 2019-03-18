import React from "react";
import { Link } from "react-router-dom";
import "./index.sass";

function HomePage() {
  return (
    <section className="home">
      <div className="home-container">
        <h1 className="home-title">InstaFoddie</h1>
        <div className="login-register">
          <div className="login">
            <Link className="login-link" to="/login">
              Login
            </Link>
          </div>
          <div className="register">
            <Link className="register-link" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
