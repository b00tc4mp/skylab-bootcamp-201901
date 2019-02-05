import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Search from '../../Search';

function DescktopHeader({ onSearch }) {
    return (
        <header className="header header--desktop content">
            <Search onSearch={onSearch} />
        </header>
    );
}

export default DescktopHeader;
