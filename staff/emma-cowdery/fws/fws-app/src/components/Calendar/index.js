import React, { Fragment } from 'react'
import './index.sass'
import moment from 'moment'

export default function Calendar () {
    const m = moment('2020-02')
    return (
        <Fragment>
            <h2>{m.format('MMM')}</h2>
            {
                (() => {
                    const days = []

                    const weeks = Math.ceil((m.day() + m.daysInMonth()) / 7)

                    let paint = false
                    let count = 1

                    for (let w = 0; w < weeks; w++) {
                        for (let d = 0; d < 7; d++) {
                            if (d === m.day()) paint = true

                            const mNow = moment(`2019-03-${count}`)

                            if (paint && count <= m.daysInMonth()) {
                                days.push(<div className="current-month-day" key={count}>{`${mNow.format('dddd')} ${count++}`}</div>)
                            } else
                                days.push(<div className="day" key={`${w}-${d}`}></div>)
                        }
                    }

                    return days
                })()
            }
        </Fragment>
    )
}