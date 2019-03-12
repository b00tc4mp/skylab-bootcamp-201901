import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'

export default function TimeSelector ({ setEventTime }) {
    const [timeHour, setTimeHour] = useState(String(new Date).substring(16, 18))
    const [timeMinute, setTimeMinute] = useState('00')
    // const hours = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30']

    const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

    const minutes = ['00', '15', '30', '45']

    useEffect(() => {
        setEventTime(timeHour.concat(':', timeMinute))
    }, [(timeMinute || timeMinute)])  //fix thuis because if a user changes the hour after the minutes, eventTime doesnt get changed

    return (
        <div className='hourSelectorDiv'>
            <select onChange={e => {e.preventDefault(); setTimeHour(e.target.value)}} defaultValue={String(new Date).substring(16, 18)}>
                {hours.map(hour =>  <option value={hour}>{hour}</option>)}
            </select>
            <select onChange={e => {e.preventDefault(); setTimeMinute(e.target.value)}}>
                {minutes.map(minute => <option valur={minute}>{minute}</option>)}
            </select>
        </div>
        
    )
}