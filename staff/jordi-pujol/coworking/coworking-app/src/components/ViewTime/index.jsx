import React from 'react'

function ViewTime({ time }) {

    return <section className="viewTime">
        <i class="fas fa-caret-square-right"></i>
        <p className="myTime">Time: {time}m</p>
    </section>
}

export default ViewTime