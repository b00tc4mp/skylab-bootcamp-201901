'use strict'

import React, { useState, useEffect } from 'react'

import logic from '../../logic';
import seaData from '../../sea-data'

import './index.sass'

function Search({ search}) {

    let [query, setQuery] = useState('')

    async function handleSearch(event){
        event.preventDefault()
        
        try{
            let seaId= await logic.findSeaId(query)
            search(seaId)
 
        }catch(error){
            console.error(error)
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
        </form>
    )
}

export default Search