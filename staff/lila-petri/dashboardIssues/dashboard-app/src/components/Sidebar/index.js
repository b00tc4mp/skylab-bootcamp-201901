import React from 'react'
import './index.sass'
import logo from './images/logo.jpeg'


function Sidebar({error, onSwitch, user, onLogout , dateFrom, dateTo, resolution, goProfile}){

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
                                <select className="uk-select uk-form-small" data-uk-tooltip="title: statistic type" name="statistic" onChange={event => onStatisticsChange(event.target.value)} defaultValue={resolution}>
                                    <option value="byResolution">By Resolution</option>
                                    <option value="bySLA" >By SLA</option>
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
                            <a href="#">
                                <span>
                                    <i className="dp-u-menu__main-icon svg-icon svg-icon__size-26 pull-right svg-icon">
                                    <svg width="27" height="34" viewBox="0 0 30 37" xmlns="http://www.w3.org/2000/svg"><path d="M10.281 16.257C8.292 14.579 7 11.798 7 8.387 7 3.376 10.415 0 15 0s8 3.376 8 8.386c0 3.412-1.292 6.193-3.281 7.871 3.47.422 5.607 1.323 6.954 2.39C28.548 20.128 30 22.021 30 26v6.032a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V26c0-3.978 1.452-5.87 3.327-7.354 1.347-1.066 3.485-1.967 6.954-2.389zM10 8.387C10 12.376 12.242 15 15 15s5-2.623 5-6.614C20 5.085 17.977 3 15 3s-5 2.085-5 5.386v.001zm-2 11.33c-1.24.333-2.163.769-2.812 1.282C3.61 22.247 3 23.429 3 26v6.032a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V26c0-2.572-.61-3.753-2.188-5.001-.812-.643-2.057-1.164-3.812-1.513v2.77c1.748.618 3 2.285 3 4.244v2a1.5 1.5 0 0 1-3 0v-2a1.5 1.5 0 0 0-3 0v2a1.5 1.5 0 0 1-3 0v-2a4.502 4.502 0 0 1 3-4.244V19.1c-.91-.066-1.91-.1-3-.1a38.19 38.19 0 0 0-4 .19v6.31a2.5 2.5 0 1 1-3 0v-5.783z"></path></svg>
                                    </i>
                                </span>
                            </a>
                            <div uk-dropdown="animation: uk-animation-slide-top-small; duration: 1000; pos: bottom-justify">
                                <ul className="uk-nav uk-dropdown-nav">
                                    <li><p>You have logged in as:</p></li>
                                    <li><p>{user.name} {user.surname} - {user.country}</p></li>
                                    <li><p>Product Expert</p></li>
                                    <li className="uk-nav-divider"></li>
                                    <li><a className="uk-nav-header" href="" onClick={goProfile}>Profile</a></li>
                                    <li><a href="#" onClick={onLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </>

}
export default Sidebar