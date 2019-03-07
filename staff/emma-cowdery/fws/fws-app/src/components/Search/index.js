import React, {useState} from 'react'
import logic from '../../logic'
import './index.sass'

export default function Search({ setQuery }) {
    //const [query, setQuery] = useState()
    const [ query, setNewQuery ] = useState()

    function handleQueryChange(e) {
        setNewQuery(e.target.value)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        setQuery(query)
    }

    return (
        <form onSubmit={handleSearchSubmit} className="search">
             <input name="search" type="text" placeholder="search" onChange={handleQueryChange} className="search__input"></input>
             <button type="submit">Search</button>
        </form>
    )
}