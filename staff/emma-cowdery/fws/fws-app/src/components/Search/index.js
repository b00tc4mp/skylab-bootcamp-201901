import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'
//import { PromiseProvider } from 'mongoose'

export default withRouter(function Search({ setSubmit, setSearch, setSearchButton, setLogo, setUserButton, setEventsButton, history, setQuery, setArrow }) {
    const [query, setNewQuery ] = useState()
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 1200) setMobile(true)
    }, [])

    // useEffect(() => {
    //     history.push(`/restaurant-results/search/${query}`)
    // }, [query])

    // function handleQueryChange(e) {
    //     setNewQuery(e.target.value)
    // }

    // function handleSearchSubmit(query) {
    //     history.push(`/restaurant-results/search/${query}`)
    // }

    

    

    return (
        <form className="search" onSubmit={e => {e.preventDefault(); setQuery(query)}}>
            <input name="search" type="text" placeholder="search..." className="search__input" onChange={e => {e.preventDefault(); setNewQuery(e.target.value)}}></input>
            {mobile ? <i className="fas fa-search search__button" onClick={e => {e.preventDefault(); setQuery(query); setSearch('no-search'); setSearchButton('search-button'); setLogo('logo'); setUserButton('user-button'); setArrow('arrow'); setEventsButton('events-button')}}></i> : <i className="fas fa-search search__button" onClick={e => {e.preventDefault(); setQuery(query)}}></i>}
            {mobile && <i className="fas fa-times search__close" onClick={e => {e.preventDefault(); setSearch('no-search'); setSearchButton('search-button'); setLogo('logo'); setUserButton('user-button'); setArrow('arrow'); setEventsButton('events-button')}}></i>}
        </form>
    )
})