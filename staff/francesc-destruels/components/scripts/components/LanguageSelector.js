import React from 'react'

function LanguageSelector({ lang, onLanguageChange }) {
    return <select onChange={event => onLanguageChange(event.target.value)} value={lang}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ca">Català</option>
        <option value="ga">Galego</option>
    </select>
}

export default LanguageSelector