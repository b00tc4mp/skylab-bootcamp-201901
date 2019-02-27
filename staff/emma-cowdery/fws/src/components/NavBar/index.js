import React from 'react'
import Search from '../Search'
import './index.sass'

export default function Navbar({setResults}) {
    return (
        <header className="nav-bar">
            <p>Logo</p>  
            {<Search setResults={setResults} className="nav-bar__search"></Search>}
            <button>User</button>
        </header>
    )
}