import React, { useContext } from "react";
import { UserContext } from "../../userContext";
import "./index.sass";
import logo from "../../images/logo.png";
function TopBar() {
  const { user, logout } = useContext(UserContext);
  return (
    <section className="TopBar">
      <img className="logo" src={logo} alt="logo" />
      <h3 className="page-title">Instafood</h3>
      <div>
        {user && (
          <button className="logout" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </section>
  );
}

export default TopBar;
