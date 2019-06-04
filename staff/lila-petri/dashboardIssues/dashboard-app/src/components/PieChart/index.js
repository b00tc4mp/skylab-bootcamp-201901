import React from 'react'
import { Chart } from 'react-google-charts'


function PieChart({ error, hotfix, bugfix, bug, request }) {

    const { 'Cannot Reproduce' : hotfixCanNot , Done : hotfixDone, Duplicate : hotfixDup, Incomplete : hotfixInc, 'Is not a Bug' : hotfixIsNot, "Won't Fix" : hotfixWontF, Unresolved : hotfixUnre } = hotfix

    const { 'Cannot Reproduce' : bugfixCanNot , Done : bugfixDone, Duplicate : bugfixDup, Incomplete : bugfixInc, 'Is not a Bug' : bugfixIsNot, "Won't Fix" : bugfixWontF, Unresolved : bugfixUnre } = bugfix
    
    const { 'Cannot Reproduce' : bugCanNot , Done : bugDone, Duplicate : bugDup, Incomplete : bugInc, 'Is not a Bug' : bugIsNot, "Won't Fix" : bugWontF, Unresolved : bugUnre } = bug

    const { 'Cannot Reproduce' : reqCanNot , Done : reqDone, Duplicate : reqDup, Incomplete : reqInc, 'Is not a Bug' : reqIsNot, "Won't Fix" : reqWontF, Unresolved : reqUnre } = request




        return <div className={"my-pretty-chart-container"}>
            {hotfix && (
            <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['HotFix', 'byResolution'],
                        ['Cannot Reproduce',hotfixCanNot ],
                        ['Done', hotfixDone],
                        ['Duplicate', hotfixDup],
                        ['Incomplete', hotfixInc], 
                        ['Is not a Bug', hotfixIsNot],
                        ["Won't Fix", hotfixWontF],
                        ['Unresolved', hotfixUnre],
                    ]}
                    options={{
                        title: 'HotFix by resolution',
                        is3D: true
                    }}
                />
            )}
            <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['BugFix', 'byResolution'],
                        ['Cannot Reproduce', bugfixCanNot],
                        ['Done', bugfixDone],
                        ['Duplicate', bugfixDup],
                        ['Incomplete', bugfixInc], 
                        ['Is not a Bug', bugfixIsNot], 
                        ["Won't Fix", bugfixWontF],
                        ['Unresolved', bugfixUnre],
                    ]}
                    options={{
                        title: 'BugFix by resolution',
                        is3D: true
                    }}
                />
            <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Bug', 'byResolution'],
                        ['Cannot Reproduce', bugCanNot],
                        ['Done', bugDone],
                        ['Duplicate', bugDup],
                        ['Incomplete', bugInc], 
                        ['Is not a Bug', bugIsNot], 
                        ["Won't Fix", bugWontF],
                        ['Unresolved', bugUnre],
                    ]}
                    options={{
                        title: 'Bugs by resolution',
                        is3D: true
                    }}
                />
            <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Request', 'byResolution'],
                        ['Cannot Reproduce', reqCanNot],
                        ['Done', reqDone],
                        ['Duplicate', reqDup],
                        ['Incomplete', reqInc], 
                        ['Is not a Bug', reqIsNot], 
                        ["Won't Fix", reqWontF],
                        ['Unresolved', reqUnre],
                    ]}
                    options={{
                        title: 'Request by resolution',
                        is3D: true
                    }}
                />
                <span>{error}</span>
        </div>
        


}
export default PieChart