import React from 'react'
import './index.sass'
function Search({ onSearch, error }) {

    return <form className='searcher' onSubmit={e => {
        e.preventDefault()

        const query = e.target.query.value
        const selector = e.target.selector.value

        onSearch(query, selector)
    }}>
        <input className='searcher__input' type="text" name="query" placeholder=' Search here' />
        <select className='searcher__selector' name="selector">
            <option value="search.php?s=">Recipe name</option>
            <option value="filter.php?i=">Ingredient</option>
            <option value="filter.php?c=">Category</option>
            <option value="filter.php?a=">Area</option>
        </select>
        <button className='searcher__button'>Search</button>
        <span className='searcher__error'>{error}</span>
    </form>
    
}

export default Search