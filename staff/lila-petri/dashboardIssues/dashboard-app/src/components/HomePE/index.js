import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import PieChart from '../PieChart'
import ColumnChart from '../ColumnChart'
import logic from '../../logic'
import moment from 'moment'
import TableSLA from '../TableSLA'
import TableResolution from '../TableResolution'
import './index.sass'
import {  withRouter } from 'react-router-dom'
import queryString from 'query-string'

class HomePE extends Component{
    state = { error: null , dateFrom: null, dateTo: null, hotfix: null, bugfix: null, bug: null, request: null, statistic: null, tableSLA: null}

    country = null
    
    handleSwitch =async (dateFrom, dateTo, statisticType, country)=>{
        
        try{
            if(statisticType === '0'){

                const hotfix = await logic.retrieveIssuesByResolution('HotFix', country, dateFrom, dateTo)
                const bugfix = await logic.retrieveIssuesByResolution('BugFix', country, dateFrom, dateTo)
                const bug = await logic.retrieveIssuesByResolution('Bug', country, dateFrom, dateTo)
                const request = await logic.retrieveIssuesByResolution('Request', country, dateFrom, dateTo)
                const statistic = '0'
                this.setState({hotfix , bugfix, bug, request, statistic, dateFrom, dateTo})
            }
            else if(statisticType === '1'){
                const hotfix = await logic.retrieveIssuesBySLA('HotFix', country, dateFrom, dateTo)
                const bugfix = await logic.retrieveIssuesBySLA('BugFix', country, dateFrom, dateTo)
                const bug = await logic.retrieveIssuesBySLA('Bug', country, dateFrom, dateTo)
                const request = await logic.retrieveIssuesBySLA('Request', country, dateFrom, dateTo)
                const tableSLA = await logic.retrieveIssuesByTable(country, dateFrom, dateTo)
                const statistic = '1'
                
                this.setState({hotfix , bugfix, bug, request, tableSLA, dateFrom, dateTo, statistic})

            }else{
                throw Error ('wrong url')
            }

        }catch(error){

            this.setState({ error: error.message })
        }

    }
    async componentWillReceiveProps(props){
        
        if (props.location.search) {
            const { from, to, statistic } = queryString.parse(props.location.search)
            await this.handleSwitch(from, to, statistic, props.user.country)
            
            console.log(statistic)

        } else {

        }
    }
    componentDidMount(){
        //const { from, to, statistic } = queryString.parse(this.props.location.search)
       // this.props.user && this.handleSwitch(from, to, statistic, this.props.user.country)
        const dateFrom = moment().subtract(1, 'month').format('YYYY-MM-DD')
        const dateTo = moment().format('YYYY-MM-DD')
        this.props.user && this.handleSwitch(dateFrom, dateTo, '0', this.props.user.country)
    }

    componentDidUpdate(prevProps){
        if (this.props.user !== prevProps.user) {
        const dateFrom = moment().subtract(1, 'month').format('YYYY-MM-DD')
        const dateTo = moment().format('YYYY-MM-DD')
        this.handleSwitch(dateFrom, dateTo, '0', this.props.user.country)
        }
    }

    // handleNewQuery = (dateFrom, dateTo, statistic, country) => {
    //     this.country = country
    //     this.props.history.push(`?from=${dateFrom}&to=${dateTo}&statistic=${statistic}`)
    // }

    render(){
        const {
            props: {user, onLogout, goProfile},
            state: {error, hotfix, bugfix, bug, request, statistic, tableSLA, dateFrom, dateTo},
            handleSwitch
        }=this
        
        return <>
        <main className="container-home">
        {user && <Sidebar user={user} onLogout={onLogout} error={error} onSwitch={handleSwitch} dateFrom={dateFrom} dateTo={dateTo} statistic={statistic} goProfile={goProfile}/>}
        {(statistic === '0') && <PieChart error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request}/>}
        {(statistic === '0') && <TableResolution error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request} />}
        {(statistic === '1') && <ColumnChart error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request} />}
        {(statistic === '1' && tableSLA) && <TableSLA error={error} tableSLA={tableSLA} />}
        
        </main>
        </>
    }

}
export default withRouter(HomePE)