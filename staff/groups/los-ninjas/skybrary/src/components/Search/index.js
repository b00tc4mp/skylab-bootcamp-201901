import React from 'react'
import './index.scss'

function Search({ onSearch }) {

    return(
        <form className="columns search-form" onSubmit={event => {
        event.preventDefault()
        const query = event.target.query.value
        onSearch(query)
    }}>
    <input className="column is-4 is-offset-3" type="text" name="query" placeholder="Search your books by title"/>
    <button className="column is-1 button is-medium is-link is-inverted search-form__button">Search</button>
    </form>
    )
}


export default Search