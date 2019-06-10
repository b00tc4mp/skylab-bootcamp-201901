import React from 'react'
import './index.sass'
import logo from './images/logo.jpeg'

function Sidebar({error, onSwitch, user, onLogout , dateFrom, dateTo, statistic, goProfile}){
    
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
                <div className="container-sidebar__top">   
                    <div>
                        <img className="logo" src={logo} alt="Logo" />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="uk-margin-top">
                                <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Date from: </label>
                                <input className="uk-input uk-form-small" data-uk-tooltip="title: start date" id="dateFrom" type="date" name="dateFrom" required defaultValue={dateFrom} max={dateTo}></input>
                            </div> 
                            <div className="uk-margin-bottom">
                                <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Date to:</label>
                                <input className="uk-input uk-form-small" data-uk-tooltip="title: end date" id="dateTo" type="date" name="dateTo" required defaultValue={dateTo} min={dateFrom}></input>
                            </div>
                            <div className="uk-form-controls">
                                <select className="uk-select uk-form-small" value={statistic || ""} data-uk-tooltip="title: statistic type" name="statistic" defaultValue={statistic} onChange={event => onStatisticsChange(event.target.value)}>
                                    <option value="0">By Resolution</option>
                                    <option value="1" >By SLA</option>
                                </select>
                            </div>
                            <div className="uk-margin">
                                <button className="uk-button uk-button-primary uk-width-1-1">Switch to ...</button>
                                <span className="uk-form-danger">{error}</span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container-sidebar__bottom">
                    <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
                        <li>
                            <span className="container-sidebar__bottom--pointer" data-uk-icon="user"></span>
                            <div uk-dropdown="animation: uk-animation-slide-top-small; duration: 1000; pos: bottom-justify">
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li><p>You have logged in as:</p></li>
                                    <li><p>{user.name} {user.surname} - {user.country}</p></li>
                                    <li><p>Product Expert</p></li>
                                    <li className="uk-nav-divider"></li>
                                    <li><a className="uk-nav-header" href="#/profile" onClick={goProfile}>Profile</a></li>
                                    <li><a href="" onClick={onLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </>

}
export default Sidebar