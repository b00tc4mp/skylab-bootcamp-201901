import React, { useState, useContext, useRef, useEffect } from 'react'
import Feedback from '../Feedback'
import { AppContext } from '../AppContext'

import './index.sass'

export default function AdvancedSearch({ onAdvancedSearch, onSkylaber, feedback, onShareResults, hashedUrl, addToClipboard }) {

    const { adSearchResults, setFeedback, setAdSearchResults, userData } = useContext(AppContext)

    const [query, setQuery] = useState(null)
    const [param, setParam] = useState('Choose filter')
    let [search, setSearch] = useState([])

    useEffect(() => {
        setFeedback(null)
        onAdvancedSearch(search)
    }, [search])

    useEffect(() => {
        handleOnAddUrlToClipboard()
    },[addToClipboard])

    const queryInput = useRef('')
    
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
            queryInput.current.blur()
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
        setAdSearchResults([])
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

    const handleOnAddUrlToClipboard = () => {
        let dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.setAttribute('value', hashedUrl);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }

    return (
        <div className='adSearch'>
            <div className='adSearch-header'>
                <h2>Choose your filter, type in your query and find out the matches!</h2>
            </div>
            <form className='adSearch-form'>
                <div className='adSearch-form__dropBtn'>
                    <select className='adSearch-form__dropBtn-content' onChange={e => setParam(e.target.value)}>
                        <option>Choose a filter</option>
                        <option value='Contact Information'>Contact Information</option>
                        <option value='Technology'>Technologies</option>
                        <option value='Work'>Work Experience</option>
                        <option value='Language'>Languages</option>
                        <option value='Education'>Education</option>
                    </select>
                </div>
                <div className='adSearch-form__input'>
                    <input ref={queryInput} type='text' name='query' placeholder='Type in the query!' tabIndex='0' onChange={e => setQuery(e.target.value)} onKeyDown={e => handleKeyPress(e)}></input>
                </div>
                <button className='btn btn--primary' type='submit' onClick={e => handleAdvancedSearch(e)}>Search</button>
                {feedback && <Feedback />}
            </form>
            <div className='adSearch-filters'>
                {search && !!search.length && 
                    <div className='adSearch-filters__header'> 
                        <h5 className='subtitle'>Filters</h5>
                        <button className='btn btn--danger' type='submit' onClick={e => handleOnReset(e)}>Reset filters</button>
                    </div>
                }
                <div className='adSearch-filters__content'>
                {search && !!search.length && search.map(res => { 
                    return (
                        <a className='pointer' onClick={e => { e.preventDefault(); handleOnParam(`${res[1]}`) }} key={res[0]}>{res[0]}: {res[1]}</a> 
                    )
                })}
                </div>
            </div>
            <div className='adSearch-results'>
            {adSearchResults && !!adSearchResults.length && 
                <div className='adSearch-results__header'>
                    <h5 className='subtitle'>Matching Skylabers</h5>
                </div>}
            {adSearchResults && !!adSearchResults.length && adSearchResults.map(res => { return (
                <div className='adSearch-results__content'>
                    <a className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                    {userData.role === 'Admin' && <i className='far fa-trash-alt icon pointer' onClick={e => { e.preventDefault(); handleRemove(`${res._id}`) }} />}
                </div> 
            )})}
            </div>
            {hashedUrl && <p className='btn btn--primary url'>Public URL added to clipboard</p>}
            {userData.role === 'Admin' && adSearchResults && <button className='btn btn--primary-inverted pointer' onClick={handleOnShareResults}>Share Results</button>}
        </div>
    )
}