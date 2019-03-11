import React, { useState, useContext } from 'react'
import Feedback from '../Feedback'
import { AppContext } from '../AppContext'

export default function AdvancedSearch({ onAdvancedSearch, onSkylaber, feedback, onShareResults, hashedUrl }) {

    const { adSearchResults, setFeedback, setAdSearchResults, userData } = useContext(AppContext)

    const [query, setQuery] = useState(null)
    const [param, setParam] = useState('Choose filter')
    let [search, setSearch] = useState([])
    
    const handleAdvancedSearch = (e) => {
        e.preventDefault()
        setFeedback(null)
        onAdvancedSearch(search)
        e.target.value = null
    }

    const handleKeyPress = (e) => {
        setFeedback(null)
        if (e.key == 'Enter') {
            setSearch([...search, [param, query]])
            e.target.value = null
        }
    }

    const handleRemove = id => {
        const skylabers = adSearchResults.filter(skylaber => skylaber._id !== id)

        adSearchResults.length === 0 ? setAdSearchResults([]) : setAdSearchResults(skylabers)
    }

    const handleOnReset = (e) => {
        e.preventDefault()
        setFeedback(null)
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

    const handleOnShareResults = (e) => {
        debugger
        e.preventDefault()

        let skylaberIds = adSearchResults.map(skylaber => skylaber._id)

        onShareResults(skylaberIds)
    }

    return (
        <section>
            <form className='dropbtn'>
                <select className='dropdown-content' onChange={e => setParam(e.target.value)}>
                    <option>Choose a filter</option>
                    <option value='Contact Information'>Contact Information</option>
                    <option value='Technology'>Technologies</option>
                    <option value='Work'>Work Experience</option>
                    <option value='Language'>Languages</option>
                    <option value='Education'>Education</option>
                </select>
                <input type='text' name='query' placeholder='Advanced Search' tabIndex='0' onChange={e => setQuery(e.target.value)} onKeyDown={e => handleKeyPress(e)}></input>
                {feedback && <Feedback />}
                <button type='submit' onClick={e => handleAdvancedSearch(e)}>Search</button>

                <button type='submit' onClick={e => handleOnReset(e)}>Reset filters</button>
            </form>
            {search && !!search.length && search.map(res => { return <a onClick={e => { e.preventDefault(); handleOnParam(`${res[1]}`) }} key={res[0]}>{res[1]}</a> })}
            {adSearchResults && <h5>Results</h5>}
            {adSearchResults && adSearchResults.map(res => { return <p><a onClick={e => { e.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}{res.email}{res.git}{res.linkedin}</a>{userData.role === 'Admin' && <button onClick={e => { e.preventDefault(); handleRemove(`${res._id}`) }}>Remove</button>}</p> })}
            {adSearchResults && <button onClick={handleOnShareResults}>Share Results</button>}
            {hashedUrl && <a href={`${hashedUrl}`}>Share Url</a>}
        </section>
    )
}