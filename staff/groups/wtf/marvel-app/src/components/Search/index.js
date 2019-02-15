'use strict'

import React, { Component } from 'react';

class Search extends Component {

    state = {query:''}

    handleQueryInput = ({ target: { value: query } }) => this.setState({ query });

    handleSearchSubmit = event => {
        event.preventDefault();

        const { state: { query }, props: { onSearch, searchBtn, searchInput } } = this;
        
        onSearch(query);
    }

    render() {

        const { handleQueryInput, handleSearchSubmit, props: {searchInput, searchBtn}} = this;

        return  <div className="columns is-mobile is-centered">
        <div className="column is-two-thirds-tablet is-three-quarters-mobile is-centered"> 
            <form onSubmit={handleSearchSubmit} className="field has-addons has-addons-centered">
                <div className="control has-icons-left is-expanded">
                    <input onChange={handleQueryInput} className="input is-small is-rounded" placeholder={searchInput} type="text" name="query"></input>
                    <span className="icon is-small is-left">
                        <i className="fas fa-bolt"></i>
                    </span>
                </div>
                <div className="control">
                    <button className="button is-small is-rounded is-warning"type="submit">{searchBtn}</button>
                </div>
            </form>
        </div>
    </div>
    }

}

export default Search;