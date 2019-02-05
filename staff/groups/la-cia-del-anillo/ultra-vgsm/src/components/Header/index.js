import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

import DescktopHeader from './DescktopHeader';
import MobileHeader from './MobileHeader';

class Header extends Component {
    state = { showDescktopHeader: false };

    handleSearch = query => {
        this.props.history.push(`/search/${query}`)
    }

    __showHeader = () => {
        if (document.body.offsetWidth >= 1024) {
            this.setState({
                showDescktopHeader: true
            });
        } else {
            this.setState({
                showDescktopHeader: false
            });
        }
    };

    componentWillMount() {
        this.__showHeader();
        window.addEventListener('resize', this.__showHeader);
    }

    render() {
        const {
            state: { showDescktopHeader }
        } = this;
        return (
            <Fragment>
                {showDescktopHeader && <DescktopHeader onSearch={this.handleSearch} />}
                {!showDescktopHeader && <MobileHeader onSearch={this.handleSearch} />}
            </Fragment>
        );
    }
}

export default withRouter(Header);
