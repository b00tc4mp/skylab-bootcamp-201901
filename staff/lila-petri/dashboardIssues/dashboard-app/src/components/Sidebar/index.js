import React from 'react'
import './index.sass'
import logo from './logo.png'


function Sidebar({error, onSwitch, user, onLogout, dateFrom, dateTo, resolution}){

    let statisticType
    function onStatisticsChange(e){
        statisticType=e
    }

    function handleSubmit(e) {
        e.preventDefault()
        const dateFrom = e.target.dateFrom.value
        const dateTo = e.target.dateTo.value
        if(!statisticType){
            statisticType = e.target.statistic.options[e.target.statistic.selectedIndex].value
        } 
        onSwitch(dateFrom, dateTo, statisticType, user.country)
    }
        return <>
            <main className="container-sidebar">
                <img src={logo} alt="Logo" />
                <h3 class="uk-text-muted">Welcome, {user.name}</h3>
                <h3 class="uk-text-muted">Profile: {user.profile}</h3>
                <h3 class="uk-text-muted">Country: {user.country}</h3>
                <form onSubmit={handleSubmit}>
                    <label class="uk-label uk-text-muted">From: </label>
                    <input id="dateFrom" type="date" name="dateFrom" required defaultValue={dateFrom} max={dateTo}></input>
                    <label class="uk-label uk-text-muted">To:   </label>
                    <input id="dateTo" type="date" name="dateTo" required defaultValue={dateTo} min={dateFrom}></input>
                    <select name="statistic" onChange={event => onStatisticsChange(event.target.value)}>
                                <option value="byResolution" selected>By Resolution</option>
                                <option value="bySLA" >By SLA</option>
                            </select>

                    <button>Switch to ...</button>
                    <span>{error}</span>
                </form>
                <div>

                <button onClick={onLogout}>Logout</button> 
                </div>
            </main>
        </>
    

}
export default Sidebar