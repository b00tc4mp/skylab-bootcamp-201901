import React from 'react'
import './index.sass'

function Clock({ clock, checkTime }) {
    clock = () => {
        let time = new Date()

        let hours = time.getHours()

        let minutes = time.getMinutes()

        let seconds = time.getSeconds()

        checkTime = time => {
            if (time < 10) {
                time = '0' + time
            }
            return time;
        }

        document.querySelectorAll('.clock')[0].innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds);

    }
    setInterval(clock, 1000);

    return <section className="clock">

    </section>
}

export default Clock