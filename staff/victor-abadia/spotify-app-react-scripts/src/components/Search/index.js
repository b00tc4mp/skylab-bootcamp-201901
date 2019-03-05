import React, { Component } from 'react';

class Search extends Component {
    state = { query: '' }

    handleQuery = ({ target: { value: query } }) => this.setState({ query })

    handleSearchSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleQuery, handleSearchSubmit } = this

        return <section className="search container col-6">
            <h1 className="title">Spotify App</h1>
            <form className="register__form p-2" onSubmit={handleSearchSubmit}>
                <h4 className="font-weight-light-normal">Search</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend"></div>
                </div>
                <input type="text" placeholder="Search an artist..." onChange={handleQuery} />
                <button type="submit">Search</button>
            </form>
        </section >
    }
}

export default Search;