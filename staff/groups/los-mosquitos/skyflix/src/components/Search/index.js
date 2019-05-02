import React from 'react'
import literals from './literals'
import './index.sass'

function Search({ lang, onSearch }) {
    const { search,placeholder } = literals['en-US'] //cambiar por lang
    return <form onSubmit={e => {
        e.preventDefault()

        const query = e.target.query.value

        onSearch(query)
    }}>
        <div className="search input-group mb-3">
            <input type="text"  className="form-control"name="query" placeholder={placeholder}/>
            <div className="input-group-append">
                <button className="btn btn-primary">{search}</button>
            </div>
        </div>
    </form>
}

export default Search