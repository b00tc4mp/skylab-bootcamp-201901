import React, { Fragment } from "react";
import "./index.sass";
import CardList from "../../components/CardList";

function ListPage() {
  return (
    <Fragment>
      <h1 className="page-title">All posts</h1>
      <CardList />
    </Fragment>
  );
}

export default ListPage;
