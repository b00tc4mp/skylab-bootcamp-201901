import React, { useRef, useContext } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

import './index.sass'

export default function Search({ onSearch, onSkylaber }) {

    const { query, setQuery, searchResults, setFeedback, feedback } = useContext(AppContext)

    const queryInput = useRef('null')

    const handleSearch = e => {
        e.preventDefault()
        setFeedback(null)
        if (!query) {
            setFeedback('Please type in your query')
        } else {
            onSearch(query)
            queryInput.current.value = null
            queryInput.current.blur()
        }
    }

    const handleOnSkylaber = id => {
        setFeedback(null)
        onSkylaber(id)
    }

    return (
        <div className='search'>
            <div className='search-header'>
                <h2>Type in your query to see all matches!</h2>
            </div>
            <form className='search-form' onSubmit={e => handleSearch(e)}>
                <div className='search-form__input'>
                    <i className='fas fa-search icon'></i>&nbsp;
                    <input ref={queryInput} type="text" name="query" placeholder="Looking for..?" onChange={e => setQuery(e.target.value)}></input>
                </div>
                <button className='btn btn--primary' type="submit">Search</button>
            </form>
            {feedback && <Feedback />}
            <div className='search-results'>
                {searchResults && !!searchResults.resContact.length &&
                    <div className='search-results__header'>
                        <h5>Contact Information</h5>
                    </div>}
                {searchResults && !!searchResults.resContact.length && searchResults.resContact.map(res => {
                    return (
                        <div className='search-results__content'>
                            <a href className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                        </div>
                    )
                })}
                {searchResults && !!searchResults.resTechs.length &&
                    <div className='search-results__header'>
                        <h5>Technologies</h5>
                    </div>}
                {searchResults && !!searchResults.resTechs.length && searchResults.resTechs.map(res => {
                    return (
                        <div className='search-results__content'>
                            <a href className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                        </div>
                    )
                })}
                {searchResults && !!searchResults.resWork.length &&
                    <div className='search-results__header'>
                        <h5>Work Experience</h5>
                    </div>}
                {searchResults && !!searchResults.resWork.length && searchResults.resWork.map(res => {
                    return (
                        <div className='search-results__content'>
                            <a href className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                        </div>
                    )
                })}
                {searchResults && !!searchResults.resLang.length &&
                    <div className='search-results__header'>
                        <h5>Languages</h5>
                    </div>}
                {searchResults && !!searchResults.resLang.length && searchResults.resLang.map(res => {
                    return (
                        <div className='search-results__content'>
                            <a href className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                        </div>
                    )
                })}
                {searchResults && !!searchResults.resEdu.length &&
                    <div className='search-results__header'>
                        <h5>Education</h5>
                    </div>}
                {searchResults && !!searchResults.resEdu.length && searchResults.resEdu.map(res => {
                    return (
                        <div className='search-results__content'>
                            <a href className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}