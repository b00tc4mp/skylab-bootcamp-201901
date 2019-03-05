'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import Home from '../Home'
import Calendar from '../Calendar'
import './index.sass'
import moment from 'moment'

function DayPicker() {

    let year = moment().get('year')
    let month = moment().get('month')+1
    let day = moment().get('date')

    let [date1, setDate1] = useState(null)
    let [date2, setDate2] = useState(null)


    function handleSelectDate(year, monthIndex, day) {

        let newDate = new Date(year, monthIndex, day)

        if (!date1 && !date2) setDate1(newDate)
        else if (newDate < date1) setDate1(newDate)
        else if (newDate > date2) setDate2(newDate)
        else if (newDate > date1 && newDate < date2) (Math.abs(newDate - date1) <= Math.abs(newDate - date2)) ? setDate1(newDate) : setDate2(newDate)
    }

    useEffect(() => {
        console.log(date1, date2)
    }, [date1, date2])

    return (<main className="dayPicker">
        < Calendar month={month} year={year} selectDate={handleSelectDate} date1={date1} date2={date2} />
        < Calendar month={month+1} year={year} selectDate={handleSelectDate} date1={date1} date2={date2} />
    </main>)
}

export default withRouter(DayPicker)