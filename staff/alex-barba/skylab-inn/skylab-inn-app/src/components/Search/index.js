import React, { useState } from 'react'
import Feedback from '../Feedback'

export default function Search({ onSearch, feedback, onToProfile, onToWelcome }) {

    const [query, setQuery] = useState(null)

    const handleSearch = event => {
        event.preventDefault()
        onSearch(query)
    }

    const handleToProfile = () => {
        onToProfile()
    }

    const handleToWelcome = () => {
        onToWelcome()
    }

    return (
        <section>
            <form onSubmit={handleSearch}>
                <input type="text" name="query" placeholder="Look for your Skylaber" onChange={e => setQuery(e.target.value)}></input>
                {feedback && <Feedback />}
                <button type="submit">Search</button>
            </form>
            <button onClick={handleToProfile}>Profile</button>
            <button onClick={handleToWelcome}>Home</button>
        </section>
    )
}