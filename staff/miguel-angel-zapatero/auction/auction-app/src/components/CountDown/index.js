import React, {useState, useEffect} from 'react'
import moment from 'moment'

function CountDown({nowDate, startDate, endDate}) {
    const [countDown, setCountDown] = useState(null)

    useEffect(() => {
        calculateCountDown()
    }, [nowDate, endDate, startDate])

    function calculateCountDown() {
        let diff
        if(startDate) diff = moment(startDate).diff(moment())
        else diff = moment(endDate).diff(moment())
        
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
        <p className="uk-margin-remove uk-padding-remove">{startDate ? "Begins on:" : "Ends in:"}</p>
        <h4 className="uk-margin-remove uk-padding-remove">{countDown}</h4>
    </>
}

export default CountDown