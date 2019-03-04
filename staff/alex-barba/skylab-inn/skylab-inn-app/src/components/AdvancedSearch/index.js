import React, { useState } from 'react'
import Feedback from '../Feedback'

export default function AdvancedSearch({ onAdvancedSearch, feedback, onToWelcome ,onToProfile, onToSignOut }) {

    const [query, setQuery] = useState(null)

    const handleAdvancedSearch = event => {
        event.preventDefault()
        onAdvancedSearch(query)
    }

    const handleToWelcome = () => {
        onToWelcome()
    }

    const handleToProfile = () => {
        onToProfile()
    }

    const handleToSignOut = () => {
        onToSignOut()
    }

    return (
        <section>
            <form onSubmit={handleAdvancedSearch}>
                <input type="text" name="query" placeholder="Advanced Search" onChange={e => setQuery(e.target.value)}></input>
                {feedback && <Feedback />}
                <button type="submit">Search</button>
            </form>
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )
}