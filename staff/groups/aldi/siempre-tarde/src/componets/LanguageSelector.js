import React from 'react'

function LanguageSelector({ lang, onLanguageChange }) {
    return <select onChange={event => onLanguageChange(event.target.value)} value={lang}>
        <option value="ca">Català</option>
        <option value="es">Español</option>
        <option value="en">English</option>
    </select>
}

export default LanguageSelector