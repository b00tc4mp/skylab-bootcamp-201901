import React from "react";
import "./index.sass";
import { Link } from "react-router-dom";
import useUser from "../../logic/user";

function ButtonBar() {
  const { user, logout } = useUser();
  return (
    <section className="buttonBar">
      <div className="landing">
        <Link to="/posts">
          <i class="fas fa-home fa-lg" />
        </Link>
      </div>
      <div className="search">
        <Link to="/search">
          <i class="fas fa-search fa-lg" />
        </Link>
      </div>
      <div className="add">
        <Link to="/add">
          <i class="fas fa-plus-circle fa-lg" />
        </Link>
      </div>
      <div className="favs">
        <Link to="/favorites">
          <i class="far fa-star fa-lg" />
        </Link>
      </div>
      <div className="profile">
        <Link to="/profile">
          <i class="far fa-user fa-lg" />
        </Link>
      </div>
      <div>{user && <button onClick={logout}>Logout</button>}</div>
    </section>
  );
}

export default ButtonBar;
