import React from 'react'
import { Chart } from 'react-google-charts'
import moment from 'moment'
import './index.sass'



function ColumnChart({ error, hotfix, bugfix, bug, request }) {
    let arrayHotFix=[]
    let arrayBugFix=[]
    let arrayBug=[]
    let arrayRequest=[]

    arrayHotFix.push(['created','overdue', { role: 'style' },'ontime', { role: 'style' }])
    hotfix.length && hotfix.forEach(element => {
        arrayHotFix.push([moment(element.created).format('MM-DD'), element.overdue,'#931621', element.ontime, '#06D6A0'])
        
    })
    arrayBugFix.push(['created','overdue',{ role: 'style' },'ontime', { role: 'style' }])
    bugfix.length && bugfix.forEach(element => {
        arrayBugFix.push([moment(element.created).format('MM-DD'),element.overdue,'#931621', element.ontime, '#06D6A0'])
        
    })
    arrayBug.push(['created','overdue',{ role: 'style' },'ontime', { role: 'style' }])
    bug.length && bug.forEach(element => {
        arrayBug.push([moment(element.created).format('MM-DD'),element.overdue,'#931621', element.ontime, '#06D6A0'])
        
    })
    arrayRequest.push(['created','overdue',{ role: 'style' },'ontime', { role: 'style' }])
    request.length && request.forEach(element => {
        arrayRequest.push([moment(element.created).format('MM-DD'),element.overdue,'#931621', element.ontime, '#06D6A0'])
        
    })


    return <div className="container-columnchart">
        <div>
            <Chart
                width={'400px'}
                height={'250px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={arrayHotFix}
                options={{
                    title: 'HotFix by SLA',
                    vAxis: { title: 'HotFix' },
                    hAxis: { title: 'Days' },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                    isStacked: true,
                    backgroundColor : '#CDD7DC'
                }}
            />
            <Chart
                width={'400px'}
                height={'250px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={arrayBugFix}
                options={{
                    title: 'BugFix by SLA',
                    vAxis: { title: 'BugFix' },
                    hAxis: { title: 'Days' },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                    isStacked: true,
                    backgroundColor : '#CDD7DC'
                }}
            />
        </div>
        <div>
            <Chart
                width={'400px'}
                height={'250px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={arrayBug}
                options={{
                    title: 'Bug by SLA',
                    vAxis: { title: 'Bugs' },
                    hAxis: { title: 'Days' },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                    isStacked: true,
                    backgroundColor : '#CDD7DC'
                }}
            />
            <Chart
                width={'400px'}
                height={'250px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={arrayRequest}
                options={{
                    title: 'Request by SLA',
                    vAxis: { title: 'Request' },
                    hAxis: { title: 'Days' },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                    isStacked: true,
                    backgroundColor : '#CDD7DC'
                }}
            />
        </div>
    </div>

}

export default ColumnChart

