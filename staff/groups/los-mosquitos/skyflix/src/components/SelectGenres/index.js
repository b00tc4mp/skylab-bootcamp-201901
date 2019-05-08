import React from 'react'
import literals from './literals'

function Genres({ lang, genres, onUpdate }) {
    const { text, button } = literals['en-US'] //cambiar por lang

    function handleSubmit(event) {
        event.preventDefault()
        const select = event.target[0]
        onUpdate(Number(select.value), )
    }
    
    return <form onSubmit={handleSubmit}>
        <p>{text}</p>
        <select>
            {   
                genres.map(({ id, name }) => 
                    <option key={id} value={id}>{name}</option>
                )   
            }
        </select>
        <button>{button}</button>
    </form>
}

export default Genres