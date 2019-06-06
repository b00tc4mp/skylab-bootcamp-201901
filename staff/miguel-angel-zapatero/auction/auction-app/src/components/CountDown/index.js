import React, {useState, useEffect} from 'react'
import moment from 'moment'

function CountDown({nowDate, endDate}) {

    // const [months, setMonths] = useState(null)
    // const [days, setDays] = useState(null)
    // const [hours, setHours] = useState(null)
    // const [minutes, setMinutes] = useState(null)
    // const [seconds, setSeconds] = useState(null)
    const [countDown, setCountDown] = useState(null)

    useEffect(() => {
        calculateCountDown()
    }, [nowDate, endDate])

    function calculateCountDown() {
        const diff = moment(endDate).diff(moment())
        const duration = moment.duration(diff)
        
        const months = duration._data.months
        const days = duration._data.days
        const hours = duration._data.hours
        const minutes = duration._data.minutes
        const seconds = duration._data.seconds

        let time = ''
        if(months) time += `${months} Months `
        if(days) time += `${days} Days `
        if(hours) time += `${hours} Hours `
        if(minutes) time += `${minutes} minutes `
        if(seconds) time += `${seconds} seconds` 

        setCountDown(time)
    }

    return <>
        <h3>CountDown</h3>
        <p>{countDown}</p>
    </>
}

export default CountDown