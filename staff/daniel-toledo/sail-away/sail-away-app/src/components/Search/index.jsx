'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../../logic';
import data from '../../data'

import Feedback from '../Feedback'

import './index.sass'

function Search(props) {

    const [query, setQuery] = useState('')
    const [feedback, setfeedback] = useState('')

    async function handleSearch(event) {
        event.preventDefault()

        try {
            const seaId = await logic.findSeaId(query)
            props.history.push(`home/${seaId}`)
            setfeedback('')

        } catch (error) {
            setfeedback(error.message)
        }

    }

    return (
        <form onSubmit={handleSearch} className='search'>
            <select name="seas" className='search__sea' onChange={e => setQuery(e.target.value)}>
                {
                    data.seas.map(sea => <option value={sea.name} key={sea.name} >{sea.name}</option>)
                }
            </select>
            <button type='submit' className='search__button'>Search</button>
            {feedback ? <Feedback message={feedback} /> : <div />}
        </form>
    )
}

export default withRouter(Search)