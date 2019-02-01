import React from 'react'
import './index.sass'

function Feedback ({message, level}) {
    return <section className={`feedback feedback--${level?` feedback--${level}`:''}`}>
        <p>{message}</p>
    </section>
}

// function Feedback({ message }) {
//     return <section class="error mt-2 col-12">{message}</section>
// }


export default Feedback