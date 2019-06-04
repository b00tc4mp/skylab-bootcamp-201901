import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import PieChart from '../PieChart'
import ColumnChart from '../ColumnChart'
import logic from '../../logic'
import moment from 'moment'
import Table from '../Table';

class Home extends Component{
    state = { error: null , dateFrom: null, dateTo: null, hotfix: null, bugfix: null, bug: null, request: null, sla: null, resolution: null, table: null}
    handleSwitch =async (dateFrom, dateTo, statisticType, country)=>{
        
        try{
            if(statisticType ==='byResolution'){

                const hotfix = await logic.retrieveIssuesByResolution('HotFix', country, dateFrom, dateTo)
                const bugfix = await logic.retrieveIssuesByResolution('BugFix', country, dateFrom, dateTo)
                const bug = await logic.retrieveIssuesByResolution('Bug', country, dateFrom, dateTo)
                const request = await logic.retrieveIssuesByResolution('Request', country, dateFrom, dateTo)
                const table = await logic.retrieveIssuesByTable(country, dateFrom, dateTo)
                const resolution = true
                const sla= false
                this.setState({hotfix , bugfix, bug, request, resolution, table, dateFrom, dateTo, sla})
            }
            else{
                const hotfix = await logic.retrieveIssuesBySLA('HotFix', country, dateFrom, dateTo)
                const bugfix = await logic.retrieveIssuesBySLA('BugFix', country, dateFrom, dateTo)
                const bug = await logic.retrieveIssuesBySLA('Bug', country, dateFrom, dateTo)
                const request = await logic.retrieveIssuesBySLA('Request', country, dateFrom, dateTo)
                const table = await logic.retrieveIssuesByTable(country, dateFrom, dateTo)
                const sla= true
                const resolution = false
                this.setState({hotfix , bugfix, bug, request, sla, table, dateFrom, dateTo, resolution})

            }

        }catch(error){

            this.setState({ error })
        }

    }
    componentDidMount(){
        let dateFrom = moment().subtract(1, 'month').format('YYYY-MM-DD')
        let dateTo = moment().format('YYYY-MM-DD')
        this.props.user && this.handleSwitch(dateFrom, dateTo, 'byResolution', this.props.user.country)
    }

    componentDidUpdate(prevProps){
        if (this.props.user !== prevProps.user) {
        let dateFrom = moment().subtract(1, 'month').format('YYYY-MM-DD')
        let dateTo = moment().format('YYYY-MM-DD')
        this.handleSwitch(dateFrom, dateTo, 'byResolution', this.props.user.country)
        }
    }

    render(){
        const {
            props: {user, onLogout},
            state: {error, hotfix, bugfix, bug, request, sla, resolution, table, dateFrom, dateTo},
            handleSwitch
        }=this
        return <>
        <main >
        <h2>Dashboard</h2>
        {user && <Sidebar user={user} onLogout={onLogout} error={error} onSwitch={handleSwitch} dateFrom={dateFrom} dateTo={dateTo} resolution={resolution}/>}
        {resolution && <PieChart error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request}/>}
        {sla && <ColumnChart error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request} />}
        {table && <Table error={error} table={table} />}
        
        </main>
        </>
    }

}
export default Home