import React from 'react'

function LanguageSelector({ lang, onLanguageChange }) {
    return <div className='select field is-right'>
    <select onChange={event => onLanguageChange(event.target.value)} value={lang}>
        <option value="ca">Català</option>
        <option value="es">Español</option>
        <option value="en">English</option>
    </select>
    </div>
}

export default LanguageSelector