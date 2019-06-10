import React from 'react'
import { Chart } from 'react-google-charts'
import './index.sass'

function TableResolution({ error, hotfix, bugfix, bug, request }) {
    let arrayTable = []
    let totalCNR = hotfix['Cannot Reproduce'] + bugfix['Cannot Reproduce'] + bug['Cannot Reproduce']+ request['Cannot Reproduce']
    let totalDone = hotfix.Done + bugfix.Done + bug.Done + request.Done
    let totalDuplicate = hotfix.Duplicate + bugfix.Duplicate + bug.Duplicate + request.Duplicate
    let totalIncomplete = hotfix.Incomplete + bugfix.Incomplete + bug.Incomplete + request.Incomplete
    let totalIsNot = hotfix['Is not a Bug'] + bugfix['Is not a Bug'] + bug['Is not a Bug']+ request['Is not a Bug']
    let totalWontFix = hotfix["Won't Fix"] + bugfix["Won't Fix"] + bug["Won't Fix"]+ request["Won't Fix"]
    let totalUnresolved = hotfix.Unresolved + bugfix.Unresolved + bug.Unresolved + request.Unresolved
    let totalTotal = hotfix.Total + bugfix.Total + bug.Total + request.Total

    
    arrayTable.push(['IssueType/Resolution ','Cannot Reproduce','Done', 'Duplicate', 'Incomplete', 'Is not a Bug', "Won't Fix", 'Unresolved', 'Total'])
    arrayTable.push(['HotFix', 
                    hotfix['Cannot Reproduce'], 
                    hotfix.Done, 
                    hotfix.Duplicate, 
                    hotfix.Incomplete, 
                    hotfix['Is not a Bug'], 
                    hotfix["Won't Fix"], 
                    hotfix.Unresolved,
                    hotfix.Total
                ])
    arrayTable.push(['BugFix', 
                    bugfix['Cannot Reproduce'], 
                    bugfix.Done, 
                    bugfix.Duplicate, 
                    bugfix.Incomplete, 
                    bugfix['Is not a Bug'], 
                    bugfix["Won't Fix"], 
                    bugfix.Unresolved,
                    bugfix.Total
                ])
    arrayTable.push(['Bug', 
                bug['Cannot Reproduce'], 
                bug.Done, 
                bug.Duplicate, 
                bug.Incomplete, 
                bug['Is not a Bug'], 
                bug["Won't Fix"], 
                bug.Unresolved,
                bug.Total
            ])
    arrayTable.push(['Request', 
            request['Cannot Reproduce'], 
            request.Done, 
            request.Duplicate, 
            request.Incomplete, 
            request['Is not a Bug'], 
            request["Won't Fix"], 
            request.Unresolved,
            request.Total
        ])
    arrayTable.push(['Total', totalCNR,  totalDone, totalDuplicate, totalIncomplete, totalIsNot, totalWontFix, totalUnresolved, totalTotal])

    return <div className="container-tableresolution uk-box-shadow-bottom" data-uk-scrollspy="cls:uk-animation-fade">
        <Chart
                width={'800px'}
                height={'300px'}
                chartType="Table"
                loader={<div>Loading Chart</div>}
                data={arrayTable}
                options={{
                }}
        
        />
    </div>
}

export default TableResolution
