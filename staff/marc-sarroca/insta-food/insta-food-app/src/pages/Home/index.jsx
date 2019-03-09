import React from "react";
import { Link } from "react-router-dom";
import "./index.sass";

function HomePage() {
  return (
    <section>
      <div className="home-container">
        <h1 className="page-title">InstaFoddie</h1>
        <div className="login-link">
          <Link to="/login">Login</Link>
        </div>
        <div className="register-link">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
