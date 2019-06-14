'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import data from '../../data'

import './index.sass'


function Languages({ getLanguages, initialLanguages }) {

    let [counter, setCounter] = useState(initialLanguages.length + 1)
    let [languages, setLanguages] = useState(initialLanguages)

    function handleChange(event, index) {
        const newLanguage = event.target.value
        if (index === languages.length - 1) languages = newLanguage === 'Select language' ? [...languages] : [...languages, event.target.value]
        else languages.splice(index, 1, newLanguage)

        setLanguages(languages)
        getLanguages(languages)
    }

    function handleDelteLenguage(index) {
        setCounter(--counter)
        languages.splice(index, 1)

        setLanguages(languages)
        getLanguages(languages)
    }


    return (<main className="languages">
        {
            [...Array(counter)].map((count, index) =>
                <div key={index}>
                    <select name="languages" onChange={event => handleChange(event, index)} value={initialLanguages[index]} key={count} className='languages__language'>
                        {
                            data.languages.map(language => <option value={language.name} key={language.code}>{language.name}</option>)
                        }
                    </select>
                    <button onClick={() => handleDelteLenguage(index)} className="fas fa-times languages__deleteButton"></button>
                </div>
            )

        }
        {(counter < 8) && <button className='languages__addButton' onClick={() => setCounter(++counter)}>Add language</button>}

    </main>)
}

export default withRouter(Languages)