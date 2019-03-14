import React, {useState} from 'react'
import logic from '../../logic'
import './index.sass'

export default function Search({ setQuery, setSearch, setSearchButton, setLogo, setUserButton, setEventsButton }) {
    //const [query, setQuery] = useState()
    const [ query, setNewQuery ] = useState()

    function handleQueryChange(e) {
        setNewQuery(e.target.value)
    }

    function handleSearchSubmit(e) {
        // setQuery(query)
    }

    return (
        <form className="search">
            <input name="search" type="text" placeholder="search..." onChange={handleQueryChange} className="search__input"></input>
            <i class="fas fa-search search__button" onClick={e => {e.preventDefault(); handleSearchSubmit(); setSearch('no-search'); setSearchButton('search-button'); setLogo('logo'); setUserButton('user-button'); setEventsButton('events-button')}}></i>
        </form>
    )
}