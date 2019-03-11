import React from 'react'

function Feedback({ message }) {

    return <section className="feedback">
        <i class="fas fa-caret-square-right"></i><p>{message}</p>
    </section>
}

export default Feedback