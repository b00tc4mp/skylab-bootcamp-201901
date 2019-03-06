import React, { useState, useContext } from 'react'
import Feedback from '../Feedback'
import { AppContext } from '../AppContext'

export default function AdvancedSearch({ onAdvancedSearch, nextAdvancedSearch, onSkylaber, feedback, onToWelcome, onToProfile, onToSignOut }) {

    const { adSearchResults, setAdSearchResults } = useContext(AppContext)

    const [query, setQuery] = useState(null)
    const [param, setParam] = useState('Choose filter')
    let [search, setSearch] = useState([])

    const handleAdvancedSearch = (e) => {
        e.preventDefault()
        onAdvancedSearch(search)
        e.target.value = null
    }

    const handleKeyPress = (e) => {
        if(e.key == 'Enter'){
            setSearch([...search,[param, query]])
            e.target.value = null
        }
    }

    const handleOnReset = (e) => {
        e.preventDefault()
        setSearch([])
        e.target.value = null
    }

    const handleOnParam = value => {
        const results = search.filter(searchParam => searchParam[1] !== value)

        results.length === 0 ? setSearch([]) : setSearch(results)
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
            <article>
                <button className="dropbtn">{param}</button>
                <div className="dropdown-content">
                    <a key="resContact" onClick={e => { e.preventDefault(); setParam('Personal info') }}>Contact Information</a>
                    <a key="resTechs" onClick={e => { e.preventDefault(); setParam('Technology') }}>Technologies</a>
                    <a key="resWork" onClick={e => { e.preventDefault(); setParam('Work') }}>Work Experience</a>
                    <a key="resLang" onClick={e => { e.preventDefault(); setParam('Language') }}>Languages</a>
                    <a key="resEdu" onClick={e => { e.preventDefault(); setParam('Education') }}>Education</a>
                </div>
                <input type="text" name="query" placeholder="Advanced Search" tabIndex="0" onChange={e => setQuery(e.target.value)} onKeyDown={e => handleKeyPress(e)}></input>
                {feedback && <Feedback />}
                <button type="submit" onClick={e => handleAdvancedSearch(e)}>Search</button>
                <button type="submit" onClick={e => handleOnReset(e)}>Reset filters</button>
            </article>

            {search && !!search.length && search.map(res => {return <a  onClick={e => { e.preventDefault(); handleOnParam(`${res[1]}`) }} key={res[0]}>{res[1]}</a>})}
            {adSearchResults && <h5>Results</h5>}
            {adSearchResults && adSearchResults.map(res => {return <a  onClick={e => { e.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )
}