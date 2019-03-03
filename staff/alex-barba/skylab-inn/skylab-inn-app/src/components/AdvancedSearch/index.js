import React, { useState } from 'react'
import Feedback from '../Feedback'

export default function AdvancedSearch({ onAdvancedSearch, feedback, onToProfile, onToWelcome }) {

    const [query, setQuery] = useState(null)

    const handleAdvancedSearch = event => {
        event.preventDefault()
        onAdvancedSearch(query)
    }

    const handleToProfile = () => {
        onToProfile()
    }

    const handleToWelcome = () => {
        onToWelcome()
    }

    return (
        <section>
            <form onSubmit={handleAdvancedSearch}>
                <input type="text" name="query" placeholder="Advanced Search" onChange={e => setQuery(e.target.value)}></input>
                {feedback && <Feedback />}
                <button type="submit">Search</button>
            </form>
            <button onClick={handleToProfile}>Profile</button>
            <button onClick={handleToWelcome}>Home</button>
        </section>
    )
}