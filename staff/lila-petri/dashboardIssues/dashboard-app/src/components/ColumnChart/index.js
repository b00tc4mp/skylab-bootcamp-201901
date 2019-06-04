import React from 'react'
import { Chart } from 'react-google-charts'
import moment from 'moment'



function ColumnChart({ error, hotfix, bugfix, bug, request }) {
    let arrayHotFix=[]
    let arrayBugFix=[]
    let arrayBug=[]
    let arrayRequest=[]

    arrayHotFix.push(['created','overdue','ontime'])
    hotfix.length && hotfix.forEach(element => {
        arrayHotFix.push([moment(element.created).format('YY-MM-DD'), element.overdue, element.ontime])
        
    })
    arrayBugFix.push(['created','overdue','ontime'])
    bugfix.length && bugfix.forEach(element => {
        arrayBugFix.push([moment(element.created).format('YY-MM-DD'), element.overdue, element.ontime])
        
    })
    arrayBug.push(['created','overdue','ontime'])
    bug.length && bug.forEach(element => {
        arrayBug.push([moment(element.created).format('YY-MM-DD'), element.overdue, element.ontime])
        
    })
    arrayRequest.push(['created','overdue','ontime'])
    request.length && request.forEach(element => {
        arrayRequest.push([moment(element.created).format('YY-MM-DD'), element.overdue, element.ontime])
        
    })


    return <div>
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={arrayHotFix}
            options={{
                title: 'HotFix by SLA',
                vAxis: { title: 'HotFix' },
                hAxis: { title: 'Days' },
                seriesType: 'bars',
                series: { 5: { type: 'line' } },
                isStacked: true
            }}
        />
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={arrayBugFix}
            options={{
                title: 'BugFix by SLA',
                vAxis: { title: 'BugFix' },
                hAxis: { title: 'Days' },
                seriesType: 'bars',
                series: { 5: { type: 'line' } },
                isStacked: true
            }}
        />
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={arrayBug}
            options={{
                title: 'Bug by SLA',
                vAxis: { title: 'Bugs' },
                hAxis: { title: 'Days' },
                seriesType: 'bars',
                series: { 5: { type: 'line' } },
                isStacked: true
            }}
        />
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={arrayRequest}
            options={{
                title: 'Request by SLA',
                vAxis: { title: 'Request' },
                hAxis: { title: 'Days' },
                seriesType: 'bars',
                series: { 5: { type: 'line' } },
                isStacked: true
            }}
        />

    </div>

}

export default ColumnChart

