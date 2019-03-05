import React, { useState, useContext } from 'react'
import Feedback from '../Feedback'
import { AppContext } from '../AppContext'

export default function AdvancedSearch({ onAdvancedSearch, nextAdvancedSearch, onSkylaber, feedback, onToWelcome, onToProfile, onToSignOut }) {

    const { adSearchResults, setAdSearchResults, count, setCount } = useContext(AppContext)

    const [query, setQuery] = useState(null)
    const [param, setDropdownTitle] = useState('Choose filter')

    const handleAdvancedSearch = event => {
        event.preventDefault()
        if (count < 1) {
            setCount(count + 1)
            onAdvancedSearch(param, query)
        } else {
            debugger
            nextAdvancedSearch(adSearchResults, param, query)
        }
    }

    const handleOnSkylaber = id => {
        onSkylaber(id)
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
                <button class="dropbtn">{param}</button>
                <div class="dropdown-content">
                    <a key="resContact" onClick={event => { event.preventDefault(); setDropdownTitle('contact') }}>Contact Information</a>
                    <a key="resTechs" onClick={event => { event.preventDefault(); setDropdownTitle('techs') }}>Technologies</a>
                    <a key="resWork" onClick={event => { event.preventDefault(); setDropdownTitle('work') }}>Work Experience</a>
                    <a key="resLang" onClick={event => { event.preventDefault(); setDropdownTitle('languages') }}>Languages</a>
                    <a key="resEdu" onClick={event => { event.preventDefault(); setDropdownTitle('education') }}>Education</a>
                </div>
                <input type="text" name="query" placeholder="Advanced Search" onChange={e => setQuery(e.target.value)}></input>
                {feedback && <Feedback />}
                <button type="submit">Search</button>
            </form>
            {adSearchResults && <h5>Results</h5>}
            {adSearchResults && adSearchResults.map(res => {return <a onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )
}