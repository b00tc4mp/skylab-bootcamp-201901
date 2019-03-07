'use strict'

import React, { useState, useEffect } from 'react'

import logic from '../../logic';
import seaData from '../../sea-data'

function Search({ search }) {

    let [query, setQuery] = useState('')

    return (
        <form onSubmit={event => {event.preventDefault(); search(query)}}>
            <select name="seas" className='journey__sea' onChange={e => setQuery(e.target.value)}>
                {
                    seaData.map(sea => <option value={sea.name} key={sea.name} >{sea.name}</option>)
                }
            </select>
            <button type='submit'>Search</button>
        </form>
    )
}

export default Search