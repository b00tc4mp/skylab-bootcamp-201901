import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import SearchOverlay from '../../SearchOverlay';

class MobileHeader extends Component {
    __showSearchMobile = () => {
        const overlay = document.querySelector('.search-overlay');
        const overlaySearch = document.querySelector('.search-overlay__search');
        overlay.style.width = '100%';
        overlaySearch.style.transform = 'translateY(0)';
        overlaySearch.childNodes[0].childNodes[1].focus();
    };

    __showAsideMobile = () => {
        const overlay = document.querySelector('.sidebar-overlay');
        const aside = document.querySelector('.sidebar');
        const wrapper = document.querySelector('.wrapper');
        wrapper.className = 'wrapper wrapper--hide';
        overlay.className = 'sidebar-overlay sidebar-overlay--show';
        aside.className = 'sidebar sidebar--show';
    }

    render() {
        const {
            props: { onSearch }
        } = this;

        return (
            <Fragment>
                <SearchOverlay onSearch={onSearch} />
                <header className="header header--mobile content">
                    <button className="header__button" onClick={() => this.__showAsideMobile()}>
                        <i className="fas fa-bars" />
                    </button>
                    <Link to="/" title="Ultra-VGMS" className="logo">
                        <img src="/images/ultra_vgsm_2.png" alt="Ultra-VGMS Logo" className="logo__image" />
                    </Link>
                    <button className="header__button" onClick={() => this.__showSearchMobile()}>
                        <i className="fas fa-search" />
                    </button>
                </header>
            </Fragment>
        );
    }
}

export default MobileHeader;
