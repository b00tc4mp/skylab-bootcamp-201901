class Searcher extends React.Component {
  state = { query: "" };

  handleQueryInput = event => {
    this.setState({ query: event.target.value });
  };

  handleSearchSubmit = event => {
    event.preventDefault();

    const {
      state: { query },
      props: { onSearch }
    } = this;

    onSearch(query);
  };

  render() {
    const { handleSearchSubmit, handleQueryInput, props: {feedback} } = this;

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
        {feedback && <Feedback message={feedback} />}
      </section>
    );
  }
}
