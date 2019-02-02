'use strict'

import React from 'react'

function LanguageSelector({ selectedLanguage, onLanguageSelected, languages }) {
    return <select onChange={onLanguageSelected}>
        {languages.map(language => language === selectedLanguage ?
            <option value={language} selected>{language.toUpperCase()}</option> :
            <option value={language}>{language.toUpperCase()}</option>
        )}
    </select>
}

export default LanguageSelector