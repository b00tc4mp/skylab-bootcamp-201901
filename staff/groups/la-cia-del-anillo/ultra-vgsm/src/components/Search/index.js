import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Feedback from '../Feedback';

class Search extends Component {
    state = { query: '' };

    handleQueryInput = ({ target: { value: query } }) => {
        this.setState({ query })
    };

    handleSearchSubmit = Event => {
        Event.preventDefault();

        const {
            state: { query },
            props: { onSearch, onHideSearch = null }
        } = this;

        onHideSearch && onHideSearch();

        onSearch(query);
    };

    render() {
        const {
            props: { button, feedback }
        } = this;

        return (
            <Fragment>
                <form className="search" onSubmit={this.handleSearchSubmit}>
                    <i className="fas fa-search" />
                    <input
                        className="search__input"
                        type="text"
                        name="query"
                        placeholder="Search..."
                        autoComplete="off"
                        onChange={this.handleQueryInput}
                    />
                    {button && (
                        <button className="search__button">
                            <i className="fas fa-search" />
                        </button>
                    )}
                </form>
                <section>{feedback && <Feedback message={feedback} />}</section>
            </Fragment>
        );
    }
}

export default Search;
