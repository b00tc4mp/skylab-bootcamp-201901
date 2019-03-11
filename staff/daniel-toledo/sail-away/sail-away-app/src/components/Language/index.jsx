'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data } from 'sail-away-data'


function Languages({ getLanguages, initialLanguages }) {

    let [languages, setLanguages] = useState(initialLanguages)
    let [counter, setCounter] = useState(1)

    function handleChange(event) {
        languages = [...languages, event.target.value]

        setLanguages(languages)
        getLanguages(languages)
    }

    return (<main className="languages">
        {
            [...Array(counter)].map(input =>
                <select name="languages" onChange={handleChange}>
                    {
                        data.languages.map(language => <option value={language.name} key={language.code}>{language.name}</option>)
                    }
                </select>
            )

        }
        <button onClick={()=>setCounter(++counter)}>Add language</button>
        <button onClick={()=>setCounter(--counter)}>Delete language</button>

    </main>)
}

export default withRouter(Languages)