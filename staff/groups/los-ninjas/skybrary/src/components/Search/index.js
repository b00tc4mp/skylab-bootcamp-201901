import React from 'react'

function Search({ onSearch }) {

    return <form onSubmit={event => {
        event.preventDefault()
        const query = event.target.query.value
        onSearch(query)
    }}>
    <input type="text" name="query"/>
    <button>Search</button>
    </form>
}


export default Search