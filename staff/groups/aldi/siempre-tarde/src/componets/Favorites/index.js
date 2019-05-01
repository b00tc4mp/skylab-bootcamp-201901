import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"

function Favorites({lang, onRegister, onLogin}) {
    const { welcome, back} = literals[lang]

    return <section>

    <h1>{welcome}</h1>
    <Link to={`/`}><button>{back}</button></Link> 
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>

    </ul>

    </section>

}
export default Favorites