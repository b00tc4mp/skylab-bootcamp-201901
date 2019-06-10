import React, { useState } from 'react'

function Search({onSearch}) {
    const [query, setQuery] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        onSearch(query)
    }

    return <>
        <form className="uk-margin uk-search uk-search-default uk-width-expand" onSubmit={handleSubmit}>
            <button className="uk-search-icon-flip " data-uk-search-icon></button>
            <input className="uk-search-input" type="search" name="search" placeholder="Search..." onChange={e => setQuery(e.target.value)} />    
        </form>
    </>
}

export default Search