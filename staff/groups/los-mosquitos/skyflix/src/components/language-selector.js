import React from 'react'

function LanguageSelector({lang, onLanguageChange}){

    return <select onChange={event => onLanguageChange(event.target.value)} value={lang}>
       <option value="en">English</option>
       <option value="es">Español</option>
    </select>

}


export default LanguageSelector
