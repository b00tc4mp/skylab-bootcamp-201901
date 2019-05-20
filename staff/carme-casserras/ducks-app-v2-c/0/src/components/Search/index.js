import React from 'react'
import literals from './literals'

function Search({ lang, query, onSearch }) {
    const { search } = literals[lang]

    return <form onSubmit={e => {
        e.preventDefault()

        const query = e.target.query.value

        onSearch(query)
    }}>
        <input type="text" name="query" defaultValue={query} />
        <button>{search}</button>
    </form>
}

export default Search