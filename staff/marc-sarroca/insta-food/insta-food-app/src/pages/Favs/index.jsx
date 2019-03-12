import React from "react";
import "./index.sass";
import Favorites from "../../components/Favorites";
function FavsPage() {
  return (
    <section>
      <h1 className="page-title">Your Favorites</h1>
      <Favorites />
    </section>
  );
}

export default FavsPage;
