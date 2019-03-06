import React, { useState } from 'react'
import Feedback from '../Feedback'

export default function Search({ onSearch, feedback, onToWelcome ,onToProfile, onToSignOut }) {

    const [query, setQuery] = useState(null)

    const handleSearch = event => {
        event.preventDefault()
        onSearch(query)
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
            <form onSubmit={handleSearch}>
                <input type="text" name="query" placeholder="Look for your Skylaber" onChange={e => setQuery(e.target.value)}></input>
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