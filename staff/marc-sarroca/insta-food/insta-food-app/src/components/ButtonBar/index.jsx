import React, { useContext } from "react";
import { UserContext } from "../../userContext";
import "./index.sass";
import { Link } from "react-router-dom";

function ButtonBar() {
  const { user, logout } = useContext(UserContext);

  return (
    <section className="buttonBar">
      <div className="landing">
        <Link to="/posts">
          <i className="fas fa-home fa-lg" />
        </Link>
      </div>
      <div className="search">
        <Link to="/search">
          <i className="fas fa-search fa-lg" />
        </Link>
      </div>
      <div className="add">
        <Link to="/add">
          <i className="fas fa-plus-circle fa-lg" />
        </Link>
      </div>
      <div className="favs">
        <Link to="/favorites">
          <i className="far fa-star fa-lg" />
        </Link>
      </div>
      <div className="profile">
        <Link to="/profile">
          <i className="far fa-user fa-lg" />
        </Link>
      </div>
      <div>{user && <button onClick={logout}>Logout</button>}</div>
    </section>
  );
}

export default ButtonBar;
