import React from "react";
import YourMaps from "../YourMaps";
import NavBar from "../NavBar";

function Home({ lang, onLogout, onLangChange }) {
  return (
    <section className="home">
      <NavBar lang={lang} onLogout={onLogout} onLangChange={onLangChange} />
      <YourMaps lang={lang} />
    </section>
  );
}

export default Home;
