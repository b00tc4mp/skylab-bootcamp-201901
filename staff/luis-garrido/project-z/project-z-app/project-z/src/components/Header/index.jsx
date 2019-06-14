import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "./index.sass";

// import Feedback from "../Feedback";

const Header = ({ history, searchFocus }) => {
    const [query, setQuery] = useState("");

    const handleQueryInput = ({ target: { value: query } }) => {
        setQuery(query);
    };

    const handleSearchSubmit = event => {
        event.preventDefault();
        const _query = query;
        setQuery("");
        history.push(`/search/${_query}`);
    };

    return (
        <div>
            <div className="header header-mobile">
                <h1 className="header__title header-mobile__title">
                    PROJECT Z
                </h1>
            </div>
            <form className="search" onSubmit={handleSearchSubmit}>
                <input
                    ref={searchFocus}
                    className="search__input"
                    type="text"
                    name="query"
                    placeholder="Search..."
                    autoComplete="off"
                    autoFocus
                    autoCorrect="off"
                    spellCheck="false"
                    value={query}
                    onChange={handleQueryInput}
                />
            </form>
        </div>
    );
};

export default withRouter(Header);
