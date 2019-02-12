import React, { Component } from "react";
import "./index.sass";

class Searcher extends Component {
  state = { query: "" };

  handleQueryInput = ({ target: { value: query } }) => this.setState({ query });

  handleSearchSubmit = event => {
    event.preventDefault();

    const {
      state: { query },
      props: { onSearch }
    } = this;

    onSearch(query);
  };

  render() {
    const { handleSearchSubmit, handleQueryInput } = this;

    return (
      <section className="search">
        <div className="container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="query"
              className="search__query"
              autoComplete="off"
              placeholder="Search an artist..."
              onChange={handleQueryInput}
            />
          </form>
        </div>
      </section>
    );
  }
}

export default Searcher;
