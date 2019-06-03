import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import PieChart from '../PieChart'
import ColumnChart from '../ColumnChart'
import logic from '../../logic'
import moment from 'moment'

class Home extends Component{
    state = { error: null , dateFrom: null, dateTo: null, hotfix: null, bugfix: null, bug: null, request: null, sla: false, resolution: false}
    handleSwitch =async (dateFrom, dateTo, statisticType, country)=>{
        try{
            if(statisticType ==='byResolution'){

                const hotfix = await logic.retrieveIssuesByResolution('HotFix', country, dateFrom, dateTo)
                const bugfix = await logic.retrieveIssuesByResolution('BugFix', country, dateFrom, dateTo)
                const bug = await logic.retrieveIssuesByResolution('Bug', country, dateFrom, dateTo)
                const request = await logic.retrieveIssuesByResolution('Request', country, dateFrom, dateTo)
                const resolution = true
                this.setState({hotfix , bugfix, bug, request, resolution})
            }
            else{
                const hotfix = await logic.retrieveIssuesBySLA('HotFix', country, dateFrom, dateTo)
                const bugfix = await logic.retrieveIssuesBySLA('BugFix', country, dateFrom, dateTo)
                const bug = await logic.retrieveIssuesBySLA('Bug', country, dateFrom, dateTo)
                const request = await logic.retrieveIssuesBySLA('Request', country, dateFrom, dateTo)
                const sla= true
                this.setState({hotfix , bugfix, bug, request, sla})

            }

        }catch(error){

            this.setState({ error })
        }

    }
    async componentDidMount(){
        let dateFrom = moment().subtract(1, 'week').format('YYYY-MM-DD')
        let dateTo = moment().format('YYYY-MM-DD')
        //this.handleSwitch(dateFrom, dateTo, 'byResolution', user.country)
        this.setState({dateFrom, dateTo})
        
    }

    render(){
        const {
            props: {user, onLogout},
            state: {error, hotfix, bugfix, bug, request, sla, resolution, dateFrom, dateTo},
            handleSwitch
        }=this
        return <>
        <main >
        <h2>Dashboard</h2>
        {user && <Sidebar user={user} onLogout={onLogout} error={error} onSwitch={handleSwitch}/>}
        {resolution && <PieChart error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request}/>}
        {sla && <ColumnChart error={error} hotfix={hotfix} bugfix={bugfix} bug={bug} request={request} />}
        
        </main>
        </>
    }

}
export default Home