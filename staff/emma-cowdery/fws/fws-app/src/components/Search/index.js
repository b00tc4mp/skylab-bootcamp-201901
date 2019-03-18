import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

export default function Search({ setQuery, setSearch, setSearchButton, setLogo, setUserButton, setEventsButton }) {
    const [query, setNewQuery ] = useState()
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 1200) setMobile(true)
    })

    function handleQueryChange(e) {
        setNewQuery(e.target.value)
    }

    function handleSearchSubmit(e) {
        setQuery(query)
    }

    return (
        <form className="search" onSubmit={e => {e.preventDefault(); handleSearchSubmit()}}>
            <input name="search" type="text" placeholder="search..." onChange={handleQueryChange} className="search__input"></input>
            {mobile ? <i class="fas fa-search search__button" onClick={e => {e.preventDefault(); handleSearchSubmit(); setSearch('no-search'); setSearchButton('search-button'); setLogo('logo'); setUserButton('user-button'); setEventsButton('events-button')}}></i> : <i class="fas fa-search search__button" onClick={e => {e.preventDefault(); handleSearchSubmit()}}></i>}
        </form>
    )
}