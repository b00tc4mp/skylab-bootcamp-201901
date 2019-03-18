import React from 'react'

function ViewTime({ time }) {

    return <section className="feedback">
        <i class="fas fa-caret-square-right"></i><p>My Time:{time}</p>
    </section>
}

export default ViewTime