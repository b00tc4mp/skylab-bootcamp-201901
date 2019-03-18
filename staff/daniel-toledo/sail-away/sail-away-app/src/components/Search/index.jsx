'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import logic from '../../logic';
import seaData from '../../sea-data'

import Feedback from '../Feedback'

import './index.sass'

function Search(props) {


    let [query, setQuery] = useState('')
    let [feedback, setfeedback] = useState('')

    async function handleSearch(event) {
        event.preventDefault()

        try {
            let seaId = await logic.findSeaId(query)
            props.history.push(`home/${seaId}`)
            setfeedback('')

        } catch (error) {
            console.log(error.message)
            setfeedback(error.message)
        }

    }

    return (
        <form onSubmit={handleSearch} className='search'>
            <select name="seas" className='search__sea' onChange={e => setQuery(e.target.value)}>
                {
                    seaData.map(sea => <option value={sea.name} key={sea.name} >{sea.name}</option>)
                }
            </select>
            <button type='submit' className='search__button'>Search</button>
            {feedback ? <Feedback message={feedback} /> : <div />}
        </form>
    )
}

export default withRouter(Search)