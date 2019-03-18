import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import dateFns from 'date-fns'

export default function Calendar({ setEventDate }) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [coloredDate, setColoredDate] = useState()
    const [selected, setSelected] = useState()

    useEffect(() => {
        calendar()
    }, [coloredDate])

    const dateFromat = 'MMMM YYYY'
    const dateFormat = 'dddd'
    const dayNames = []

    var startDate = dateFns.startOfWeek(currentMonth)

    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate2 = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)

    const dateFormat2 = 'D'
    const rows = []

    var dayNumber = []
    var day = startDate2
    var formattedDate = ''

    function calendar() {
        return (
            <div className='calendar'>
                <div className='calendar__header'>
                    <i className="fas fa-chevron-left calendar__header-left" onClick={e => { e.preventDefault(); setCurrentMonth(dateFns.subMonths(currentMonth, 1)) }}></i>
                    <span>
                        {dateFns.format(currentMonth, dateFromat)}
                    </span>
                    <i className="fas fa-chevron-right calendar__header-right" onClick={e => { e.preventDefault(); setCurrentMonth(dateFns.addMonths(currentMonth, 1)) }}></i>
                </div>
                {
                    (() => {
                        for (var i = 0; i < 7; i++) {
                            dayNames.push(<div className='name' key={i}>{dateFns.format(dateFns.addDays(startDate, i), dateFormat).substring(0, 1)}</div>)
                        }
                        return <div className='dayNames'>{dayNames}</div>
                    })()
                }
                {
                    (() => {
                        while (day <= endDate) {
                            for (var i = 0; i < 7; i++) {
                                formattedDate = dateFns.format(day, dateFormat2)
                                const cloneDay = day

                                if (coloredDate && String(cloneDay).substring(0, 15) === String(coloredDate).substring(0, 15)) {
                                    dayNumber.push(
                                        <div className={`oneDay ${selected}`} key={day} onClick={e => { e.preventDefault(); setEventDate(Date(dateFns.parse(cloneDay))); setColoredDate(cloneDay)}}>
                                            <span>{formattedDate}</span>
                                        </div>
                                    )
                                } else dayNumber.push(<div className={'oneDay'} key={day} onClick={e => { e.preventDefault(); setEventDate(Date(dateFns.parse(cloneDay))); setColoredDate(cloneDay); setSelected('selected'); console.log('click') }}>
                                    <span>{formattedDate}</span>
                                </div>)
                                day = dateFns.addDays(day, 1)
                            }
                            rows.push(<div className='dayNumbers' key={day}>{dayNumber}</div>)
                            dayNumber = []
                        }
                        return <div className='rows'>{rows}</div>
                    })()
                }
            </div>
        )
    }
    return (
        <Fragment>
            {calendar()}
        </Fragment>
    )
}