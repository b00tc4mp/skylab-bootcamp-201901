import React from 'react';

import Search from '../../Search';

function DescktopHeader({ onSearch }) {
    return (
        <header className="header header--desktop content">
            <Search onSearch={onSearch} />
        </header>
    );
}

export default DescktopHeader;
