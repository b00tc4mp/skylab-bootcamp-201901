import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

export default function Search({ onSearch, feedback, onToWelcome, onToProfile, onToSignOut }) {

    const { query, setQuery, searchResults} = useContext(AppContext)

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
            {searchResults && searchResults.map(res => {return <p key={res.id}>{res.name}</p>})}
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )
}