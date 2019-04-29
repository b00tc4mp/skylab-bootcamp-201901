import React from 'react'

function Search({ onSearch, error }) {

    return <form onSubmit={e => {
        e.preventDefault()

        const query = e.target.query.value
        const selector = e.target.selector.value

        onSearch(query, selector)
    }}>
        <input type="text" name="query" />
        <select name="selector">
            <option value="search.php?s=">Recipe name</option>
            <option value="filter.php?i=">Ingredient</option>
            <option value="filter.php?c=">Category</option>
            <option value="filter.php?a=">Area</option>
        </select>
        <button>Search</button>
        <span>{error}</span>
    </form>
    
}

export default Search