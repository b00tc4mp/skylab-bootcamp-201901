import React from 'react'
import './index.scss'

function Search({ onSearch }) {

    return (
        <form className="columns search-form is-multiline" onSubmit={event => {
            event.preventDefault()
            const query = event.target.query.value
            onSearch(query)
        }}>

            <input class="column is-3-desktop is-offset-4-desktop is-6-tablet is-offset-2-tablet is-8-mobile is-offset-2-mobile" type="text" name="query" placeholder="Search your books by title" />
            <p className=" search-form__button column is-2 is-offset-mobile-5 has-text-centered-mobile">
                <button className=" button is-medium  is-link is-inverted">Search</button>
            </p>
        </form>
    )
}


export default Search