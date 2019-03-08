import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

export default function Search({ onSearch, onSkylaber, feedback }) {

    const { query, setQuery, searchResults, setFeedback } = useContext(AppContext)

    const handleSearch = e => {
        e.preventDefault()
        setFeedback(null)
        onSearch(query)
    }

    const handleOnSkylaber = id => {
        setFeedback(null)
        onSkylaber(id)
    }

    return (
        <section>
            <form onSubmit={e => handleSearch(e)}>
                <input type="text" name="query" placeholder="Look for your Skylaber" onChange={e => setQuery(e.target.value)}></input>
                {feedback && <Feedback />}
                <button type="submit">Search</button>
            </form>
            {searchResults && !!searchResults.resContact.length && <h5>Contact Information</h5>}
            {searchResults && !!searchResults.resContact.length && searchResults.resContact.map(res => { return <a onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
            {searchResults && !!searchResults.resTechs.length && <h5>Technologies</h5>}
            {searchResults && !!searchResults.resTechs.length && searchResults.resTechs.map(res => { return <a onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
            {searchResults && !!searchResults.resWork.length && <h5>Work Experience</h5>}
            {searchResults && !!searchResults.resWork.length && searchResults.resWork.map(res => { return <a onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
            {searchResults && !!searchResults.resLang.elgnth && <h5>Languages</h5>}
            {searchResults && !!searchResults.resLang.length && searchResults.resLang.map(res => { return <a onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
            {searchResults && !!searchResults.resEdu.length && <h5>Education</h5>}
            {searchResults && !!searchResults.resEdu.length && searchResults.resEdu.map(res => { return <a onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}</a> })}
        </section>
    )
}