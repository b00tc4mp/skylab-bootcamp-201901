'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data } from 'sail-away-data'


function Languages({ getLanguages, initialLanguages }) {

    let [languages, setLanguages] = useState(initialLanguages)
    let [counter, setCounter] = useState(initialLanguages.length + 1)

    function handleChange(event) {
        let newLanguage = event.target.value
        languages = newLanguage === 'Select language' ? [...languages] : [...languages, event.target.value]

        setLanguages(languages)
        getLanguages(languages)
    }

    return (<main className="languages">
        {
            [...Array(counter)].map((input, index) =>
                <select name="languages" onChange={handleChange} value={initialLanguages[index]}>
                    {
                        data.languages.map(language => <option value={language.name} key={language.code}>{language.name}</option>)
                    }
                </select>
            )

        }
        <button onClick={() => setCounter(++counter)}>Add language</button>
        <button onClick={() => setCounter(--counter)}>Delete language</button>

    </main>)
}

export default withRouter(Languages)