import React, {useState} from 'react'
import logic from '../../logic'
import './index.sass'

export default function Search({setResults}) {
    const [query, setQuery] = useState()

    function handleQueryChange(query) {
        setQuery(query.target.value)
    }

    function handleSearchSubmit() {
        logic.search(query)
            .then(results => {
                setResults(results)
            })
    }

    return (
        <form onSubmit={handleSearchSubmit} className="search">
             <input name="search" type="text" placeholder="search" value={query} onChange={handleQueryChange} className="search__input"></input>
             <button>Search</button>
        </form>
    )
}