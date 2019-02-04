'use strict'

import React, { Component } from 'react';

class Search extends Component {

    state = {query:''}

    handleQueryInput = ({ target: { value: query } }) => this.setState({ query });

    handleSearchSubmit = event => {
        event.preventDefault();

        const { state: { query }, props: { onSearch } } = this;

        onSearch(query);
    }

    render() {

        const { handleQueryInput, handleSearchSubmit} = this;

        return <section>
                    <h2>probando</h2>
                    <form onSubmit={handleSearchSubmit}>
                        <input type='text' placeholder='Search Character' onChange={handleQueryInput}/>
                        <button type='submit'>Search</button>
                    </form>     
               </section>
    }

}

export default Search;