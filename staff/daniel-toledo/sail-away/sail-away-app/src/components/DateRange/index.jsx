'use strict'

import React, { useState} from 'react'
import moment from 'moment'

import Calendar from '../Calendar'

import './index.sass'

function DateRange({getDates}) {

    let [month1, setMonth1] = useState(moment().get('month') + 1)
    let [year1, setYear1] = useState(moment().get('year'))

    let [month2, setMonth2] = useState(moment().add(1, 'month').get('month') + 1)
    let [year2, setYear2] = useState(moment().add(1, 'month').get('year'))

    let [date1, setDate1] = useState(null)
    let [date2, setDate2] = useState(null)


    function handleSelectDate(year, monthIndex, day) {

        let newDate = new Date(year, monthIndex, day)

        if (!date1 && !date2) setDate1(newDate)
        else if (newDate < date1) setDate1(newDate)
        else if (newDate > date2) setDate2(newDate)
        else if (newDate > date1 && newDate < date2) (Math.abs(newDate - date1) <= Math.abs(newDate - date2)) ? setDate1(newDate) : setDate2(newDate)   
    }

    getDates(date1, date2)

    function increaseMonth() {
        setMonth1(moment(`${year1}-${month1}`).add(1, 'months').get('month') + 1)
        setYear1(moment(`${year1}-${month1}`).add(1, 'months').get('year'))
        setMonth2(moment(`${year2}-${month2}`).add(1, 'months').get('month') + 1)
        setYear2(moment(`${year2}-${month2}`).add(1, 'months').get('year'))
    }

    function decreaseMonth() {
        setMonth1(moment(`${year1}-${month1}`).subtract(1, 'months').get('month') + 1)
        setYear1(moment(`${year1}-${month1}`).subtract(1, 'months').get('year'))
        setMonth2(moment(`${year2}-${month2}`).subtract(1, 'months').get('month') + 1)
        setYear2(moment(`${year2}-${month2}`).subtract(1, 'months').get('year'))
    }


    return (<main className="dayPicker">
        <div className="dayPicker__caret">
            <button class="fas fa-caret-left fa-2x" onClick={decreaseMonth}></button>
            <button class="fas fa-caret-right fa-2x" onClick={increaseMonth}></button>
        </div>
        <div className="dayPicker__calendar">
            < Calendar month={month1} year={year1} selectDate={handleSelectDate} date1={date1} date2={date2} />
            < Calendar month={month2} year={year2} selectDate={handleSelectDate} date1={date1} date2={date2} />
        </div>
    </main>)
}

export default DateRange