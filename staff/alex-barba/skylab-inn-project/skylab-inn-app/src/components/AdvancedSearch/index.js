import React, { useState, useContext, useRef, useEffect } from 'react'
import Feedback from '../Feedback'
import { AppContext } from '../AppContext'

import './index.sass'

export default function AdvancedSearch({ onAdvancedSearch, onSkylaber, onShareResults, hashedUrl, addToClipboard }) {

    const { adSearchResults, setFeedback, setAdSearchResults, userData, feedback, search, setSearch } = useContext(AppContext)

    const [query, setQuery] = useState(null)
    const [param, setParam] = useState('Choose a filter')


    const inputQuery = useRef('')

    useEffect(() => {
        handleOnAddUrlToClipboard()
    }, [addToClipboard])

    useEffect(() => {
        search && !!search.length && onAdvancedSearch(search)
    },[search])

    const handleAdvancedSearch = (e) => {
        e.preventDefault()
        setFeedback(null)
        if (!search.length) {
            setFeedback('Please, set at least one filter')
            inputQuery.current.blur()
        } else {
            onAdvancedSearch(search)
            setQuery(null)
            setParam('Choose a filter')
            inputQuery.current.value = null
            inputQuery.current.blur()
        }
    }

    const handleOnAddParam = (e) => {
        e.preventDefault()
        setFeedback(null)
        if (!query) {
            setFeedback('Please type in your query')
            inputQuery.current.blur()
        } else if (param === 'Choose a filter' || !param) {
            setFeedback('Please choose your filter')
            inputQuery.current.blur()
        } else {
            if(search === null) setSearch([[param, query]])
            else {
                const index = search.findIndex(filter => filter[0] === param && filter[1] === query)
                index === -1 ? setSearch([...search, [param, query]]) : setFeedback('This filter is already added!')
            }    
            setQuery(null)
            setParam('Choose a filter')
            inputQuery.current.value = null
            inputQuery.current.blur()
        }
    }

    const handleRemove = id => {
        const skylabers = adSearchResults.filter(skylaber => skylaber._id !== id)

        adSearchResults.length === 0 ? setAdSearchResults([]) : setAdSearchResults(skylabers)
    }

    const handleOnReset = (e) => {
        e.preventDefault()
        setFeedback(null)
        setParam('Choose a filter')
        setSearch([])
        setAdSearchResults([])
        e.target.value = null
    }

    const handleOnParam = param => {
        let results

        if (search) results = search.filter(filter => filter !== param)
        else return

        if (results.length === 0) {
            setFeedback(null)
            setSearch([])
            setAdSearchResults([])
        } else {
            setFeedback(null)
            setSearch(results)
            onAdvancedSearch(search)
        }
    }

    const handleOnSkylaber = id => {
        onSkylaber(id)
    }

    const handleOnShareResults = (e) => {
        e.preventDefault()

        let skylaberIds = adSearchResults.map(skylaber => skylaber._id)

        if (skylaberIds.length) onShareResults(skylaberIds)
        else return setFeedback('No Skylabers to share!')
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
                    <select className='adSearch-form__dropBtn-content' onChange={e => setParam(e.target.value)} value={param}>
                        <option value='Choose a filter'>Choose a filter</option>
                        <option value='Contact Information'>Contact Information</option>
                        <option value='Technology'>Technologies</option>
                        <option value='Work'>Work Experience</option>
                        <option value='Language'>Languages</option>
                        <option value='Education'>Education</option>
                    </select>
                </div>
                <div className='adSearch-form__input'>
                    <input ref={inputQuery} type='text' name='query' placeholder='Your query!' tabIndex='0' onChange={e => setQuery(e.target.value)} ></input>
                </div>
                <div className='adSearch-form__add'>
                    <button className='btn btn--primary' type='submit' onClick={e => handleOnAddParam(e)}>Add</button>
                </div>
            </form>
            <div className='adSearch-filters'>
                {search && !!search.length &&
                    <div className='adSearch-filters__header'>
                        <h5 >Filters</h5>
                        <button className='btn btn--danger' type='submit' onClick={e => handleOnReset(e)}>Reset filters</button>
                    </div>
                }
                <div className='adSearch-filters__content'>
                    {search && !!search.length && search.map(res => {
                        return (
                            <a href className='pointer' onClick={e => { e.preventDefault(); handleOnParam(res) }} key={res}>{res[0]}: {res[1]}</a>
                        )
                    })}
                </div>
            </div>
            <div className='adSearch-search'>
                <button className='btn btn--primary' type='submit' onClick={e => handleAdvancedSearch(e)}>Search</button>
            </div>
            {feedback && <Feedback />}
            <div className='adSearch-results'>
                {adSearchResults && !!adSearchResults.length &&
                    <div className='adSearch-results__header'>
                        <h5 className='subtitle'>Matching Skylabers</h5>
                    </div>}
                {adSearchResults && !!adSearchResults.length && adSearchResults.map(res => {
                    return (
                        <div className='adSearch-results__content'>
                            <a href className='pointer' onClick={event => { event.preventDefault(); handleOnSkylaber(`${res._id}`) }} key={res._id}>{res.name}&nbsp;{res.surname}</a>
                            {userData.role === 'Admin' && <i className='far fa-trash-alt icon pointer' onClick={e => { e.preventDefault(); handleRemove(`${res._id}`) }} />}
                        </div>
                    )
                })}
            </div>
            {userData.role === 'Admin' && adSearchResults && !!adSearchResults.length && <button className='btn btn--primary-inverted pointer share' onClick={handleOnShareResults}>Share Results</button>}
        </div>
    )
}