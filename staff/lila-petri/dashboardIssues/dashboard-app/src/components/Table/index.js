import React from 'react'
import { Chart } from 'react-google-charts'

function Table({ error, table }) {
    let arrayTable=[]

    arrayTable.push( [
        { type: 'string', label: 'IssueType' },
        { type: 'string', label: 'Overdue' },
        { type: 'string', label: 'Overdue %' },
        { type: 'string', label: 'Ontime' },
        { type: 'string', label: 'Ontime %' },
        { type: 'string', label: 'Total' }

    ])
    table.length && table.forEach(element => {
        let overdueP= (element.overdue / element.total)*100
        overdueP = Math.round( overdueP )
        let ontimeP= (element.ontime / element.total)*100
        ontimeP = Math.round( ontimeP )

        arrayTable.push([`${element.issueType}`, `${element.overdue}`, `${overdueP}%`, `${element.ontime}`, `${ontimeP}%`, `${element.total}`])
    })

    return <Chart
            width={'500px'}
            height={'300px'}
            chartType="Table"
            loader={<div>Loading Chart</div>}
            data={arrayTable}
            options={{
            }}
    
    />
}

export default Table
