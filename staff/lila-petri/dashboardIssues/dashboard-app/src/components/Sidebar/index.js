import React from 'react'


function Sidebar({error, onSwitch, user, onLogout, dateFrom, dateTo, resolution}){

    let statisticType
    function onStatisticsChange(e){
        statisticType=e
    }

    function handleSubmit(e) {
        e.preventDefault()

        const dateFrom = e.target.dateFrom.value
        const dateTo = e.target.dateTo.value

        onSwitch(dateFrom, dateTo, statisticType, user.country)
    }

        return <>
        <main >
        <h3>User, {user.name}</h3>
        <h3>Profile: {user.profile}</h3>
        <h3>Country: {user.country}</h3>
        <form onSubmit={handleSubmit}>
            <label>From: </label>
            <input id="dateFrom" type="date" name="dateFrom" required defaultValue={dateFrom}></input>
            <label>To: </label>
            <input id="dateTo" type="date" name="dateTo" required defaultValue={dateTo}></input>
            <select name="country" onChange={event => onStatisticsChange(event.target.value)} defaultValue={resolution}>
                        <option value="byResolution">By Resolution</option>
                        <option value="bySLA">By SLA</option>
                    </select>

            <button>Switch to ...</button>
            <span>{error}</span>
        </form>
        <button onClick={onLogout}>Logout</button> 
        </main>
        </>
    

}
export default Sidebar