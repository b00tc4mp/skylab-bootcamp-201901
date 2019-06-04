import React, { useState } from 'react'

function Search({onSearch, filters}) {
    const [query, setQuery] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        onSearch(query, filters)
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder="Search..." onChange={e => setQuery(e.target.value)} />
            <button>Search</button>
        </form>
    </>
}

export default Search