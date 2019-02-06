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

        return  <div className="columns is-mobile is-centered">
        <div className="column is-two-thirds-tablet is-three-quarters-mobile is-centered"> 
            <form onSubmit={handleSearchSubmit} className="field has-addons has-addons-centered">
                <div className="control has-icons-left is-expanded">
                    <input onChange={handleQueryInput} className="input is-small is-rounded" placeholder="Find a character" type="text" name="query"></input>
                    <span className="icon is-small is-left">
                        <i class="fas fa-bolt"></i>
                    </span>
                </div>
                <div className="control">
                    <button className="button is-small is-rounded is-warning"type="submit">Find!</button>
                </div>
            </form>
        </div>
    </div>
    }

}

export default Search;