import React from 'react'
import literals from './literals'

function Search({ lang, onSearch }) {
    const { search,placeholder } = literals['en-US'] //cambiar por lang
    return <form onSubmit={e => {
        e.preventDefault()

        const query = e.target.query.value

        onSearch(query)
    }}>
        <input type="text" name="query" placeholder={placeholder}/>
        <button>{search}</button>
    </form>
}

export default Search