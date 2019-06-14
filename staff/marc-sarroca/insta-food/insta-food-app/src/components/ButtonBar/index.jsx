import React from "react";
import "./index.sass";
import { Link } from "react-router-dom";

function ButtonBar() {
  return (
    <section className="buttonBar">
      <div className="landing ">
        <Link to="/posts">
          <i className="fas fa-home fa-lg animation" />
        </Link>
      </div>
      <div className="search">
        <Link to="/search">
          <i className="fas fa-search fa-lg animation" />
        </Link>
      </div>
      <div className="add">
        <Link to="/add">
          <i className="fas fa-plus-circle fa-lg animation" />
        </Link>
      </div>
      <div className="favs">
        <Link to="/favorites">
          <i className="far fa-star fa-lg animation" />
        </Link>
      </div>
      <div className="profile animation">
        <Link to="/profile">
          <i className="far fa-user fa-lg" />
        </Link>
      </div>
    </section>
  );
}

export default ButtonBar;
