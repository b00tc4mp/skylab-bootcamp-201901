import React, { useState } from 'react'
import moment from 'moment'

import './index.sass'

function Calendar({ month, year, selectDate, date1, date2 }) {

    const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const m = moment(`${year}-${month}`)

    return (<section className='calendar'>
        <div>
            <h4 className='text-center'>{m.format('MMMM')} {m.format('YYYY')}</h4>
            <div className='month'>
                {
                    week.map(day => <div className='week'>{day}</div>)
                }
                {
                    (() => {
                        const days = []

                        const weeks = Math.ceil((m.day() + m.daysInMonth()) / 7)

                        let paint = false
                        let count = 1
                        let dayClass, date
                        
                        
                        for (let w = 0; w < weeks; w++) {
                            for (let d = 0; d < 7; d++) {
                                if (d === m.day()) paint = true
                                
                                if (paint && count <= m.daysInMonth()) {
                                    let day=count

                                    date=new Date(m.year(), m.month(), day )
                                    
                                    if(date1 && date2) {
                                        if (date.toString()===date1.toString()) dayClass='day start'
                                        else if((date > date1 && date < date2)) dayClass='day selected'
                                        else if (date.toString()===date2.toString()) dayClass='day end'
                                        else dayClass='day'
                                    }

                                    else if(date1 && date1.toString()===date.toString() && !date2) dayClass='day start'
                                    
                                    else dayClass='day'

                                    days.push(<div
                                        className={dayClass}
                                        key={count}
                                        onClick={() => { selectDate(m.year(), m.month(), day ) }}>{`${count++}`}
                                    </div>)
                                } else
                                    days.push(<div className="day" key={`${w}-${d}`}></div>)
                            }
                        }

                        return days
                    })()
                }
            </div>
        </div>

    </section>)
}

export default Calendar
