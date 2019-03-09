import React, { Fragment, useState } from 'react'
import './index.sass'
import moment from 'moment'
import dateFns from 'date-fns' 

export default function Calendar () {
    const [currentMonth, setCurrentMonth] = useState()
    const [selectedDate, setSelectedDate] = useState()

    const dateFromat = 'MMMM YYYY'
    const dateFormat = 'dddd'
    const days = []

    var startDate = dateFns.startOfWeek(currentMonth)

    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    return (
        <Fragment>
            <div>
                <div className='header'>
                    <button onClick={e => {e.preventDefault(); setCurrentMonth(dateFns.addMonths(currentMonth, 1))}}>left</button>
                    <span>
                        {dateFns.format(currentMonth, dateFromat)}
                    </span>
                    <button onClick={e => {e.preventDefault(); setCurrentMonth(dateFns.subMonths(currentMonth, 1))}}>right</button>
                </div>
            </div>
            {
                (() => {
                    for (var i = 0; i < 7; i++) {
                        days.push(<div key={i}>{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}</div>)
                    }
                    return <div className='days'>{days}</div>
                })
            }
        </Fragment>
    )
}