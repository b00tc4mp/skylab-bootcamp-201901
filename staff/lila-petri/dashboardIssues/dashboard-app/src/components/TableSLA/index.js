import React from 'react'
import { Chart } from 'react-google-charts'
import './index.sass'

function TableSLA({ error, tableSLA }) {
    let arrayTable=[]
    let overdueP
    let ontimeP
    let totalOverdue = 0
    let totalOntime = 0
    let totalTotal = 0
    let totalOverdueP
    let totalOntimeP

    arrayTable.push( [
        { type: 'string', label: 'IssueType' },
        { type: 'string', label: 'Overdue' },
        { type: 'string', label: 'Overdue %' },
        { type: 'string', label: 'Ontime' },
        { type: 'string', label: 'Ontime %' },
        { type: 'string', label: 'Total' }

    ])
    tableSLA.length && tableSLA.forEach(element => {
        overdueP = (element.overdue / element.total)*100
        overdueP = Math.round( overdueP )
        ontimeP = (element.ontime / element.total)*100
        ontimeP = Math.round( ontimeP )
        totalOverdue += element.overdue
        totalOntime += element.ontime
        totalTotal += element.total
        arrayTable.push([`${element.issueType}`, `${element.overdue}`, `${overdueP}%`, `${element.ontime}`, `${ontimeP}%`, `${element.total}`])
    })
    totalOverdueP = (totalOverdue / totalTotal)*100
    totalOverdueP = Math.round( totalOverdueP )
    totalOntimeP = (totalOntime / totalTotal)*100
    totalOntimeP = Math.round( totalOntimeP )


    arrayTable.push(['Total', `${totalOverdue}`, `${totalOverdueP}%`, `${totalOntime}`, `${totalOntimeP}%`, `${totalTotal}`])

    return <div className="container-tablesla uk-box-shadow-bottom">
    <Chart
            width={'400px'}
            height={'300px'}
            chartType="Table"
            loader={<div>Loading Chart</div>}
            data={arrayTable}
            options={{
            }}
    
    />
    </div>
}

export default TableSLA
