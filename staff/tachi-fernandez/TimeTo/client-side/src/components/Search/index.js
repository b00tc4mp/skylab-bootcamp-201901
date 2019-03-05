import React, { Component } from 'react'

class Search extends Component {

    render() {
        return (
            <section className="search">
                <h1 className="search__title">Search</h1>
                <input type="text" placeholder="search" required />
            </section>
        )
    }
}

export default Search