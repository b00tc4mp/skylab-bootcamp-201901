import React, { Component, Fragment } from 'react';

import Search from '../Search';

class SearchOverlay extends Component {
    

    __hideSearchMobile = () => {
        const overlay = document.querySelector('.search-overlay');
        const overlaySearch = document.querySelector('.search-overlay__search');
        overlay.style.width = '0%';
        overlaySearch.style.transform = 'translateY(-100%)';
    };

    render() {
        const {
            props: { onSearch },
            __hideSearchMobile
        } = this;

        return (
            <Fragment>
                <div className="search-overlay" onClick={__hideSearchMobile}></div>
                <div className="search-overlay__search">
                    <Search onSearch={onSearch} button={true} onHideSearch={__hideSearchMobile} />
                </div>
                </Fragment>
        );
    }
}

export default SearchOverlay;
