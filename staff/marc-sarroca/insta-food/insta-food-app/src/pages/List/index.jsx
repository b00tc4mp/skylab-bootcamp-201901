import React from "react";
import "./index.sass";
import CardList from "../../components/CardList";

function ListPage() {
  return (
    <section>
      <h1 className="page-title">All Posts</h1>
      <CardList />
    </section>
  );
}

export default ListPage;
