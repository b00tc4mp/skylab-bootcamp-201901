import React from 'react'
import { Chart } from 'react-google-charts'
import './index.sass'


function PieChart({ error, hotfix, bugfix, bug, request }) {

    const { 'Cannot Reproduce' : hotfixCanNot , Done : hotfixDone, Duplicate : hotfixDup, Incomplete : hotfixInc, 'Is not a Bug' : hotfixIsNot, "Won't Fix" : hotfixWontF, Unresolved : hotfixUnre } = hotfix

    const { 'Cannot Reproduce' : bugfixCanNot , Done : bugfixDone, Duplicate : bugfixDup, Incomplete : bugfixInc, 'Is not a Bug' : bugfixIsNot, "Won't Fix" : bugfixWontF, Unresolved : bugfixUnre } = bugfix
    
    const { 'Cannot Reproduce' : bugCanNot , Done : bugDone, Duplicate : bugDup, Incomplete : bugInc, 'Is not a Bug' : bugIsNot, "Won't Fix" : bugWontF, Unresolved : bugUnre } = bug

    const { 'Cannot Reproduce' : reqCanNot , Done : reqDone, Duplicate : reqDup, Incomplete : reqInc, 'Is not a Bug' : reqIsNot, "Won't Fix" : reqWontF, Unresolved : reqUnre } = request


        return <div className="container-piechart">
            <div className="uk-box-shadow-bottom" data-uk-scrollspy="cls:uk-animation-fade">
                <div>
                    {hotfix && (
                    <Chart
                            chartType="PieChart"
                            width={'400px'}
                            height={'225px'}
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
                                slices: [{color: '#2176FF'}, {color: '#06D6A0'}, {color: '#FFD166'}, {color: '#118AB2'},{color: '#BF211E'}, {color: '#073B4C'}, {color: '#EF476F'}],    
                                is3D: true,
                                backgroundColor : '#eaebed'
                            }}
                        />
                    )}
                </div>
                <div>
                    {bugfix && (
                    <Chart
                            chartType="PieChart"
                            width={'400px'}
                            height={'225px'}
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
                                slices: [{color: '#2176FF'}, {color: '#06D6A0'}, {color: '#FFD166'}, {color: '#118AB2'},{color: '#BF211E'}, {color: '#073B4C'}, {color: '#EF476F'}],    
                                is3D: true,
                                backgroundColor : '#eaebed'
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="uk-box-shadow-bottom" data-uk-scrollspy="cls:uk-animation-fade">
                <div>
                    {bug && (
                    <Chart
                            chartType="PieChart"
                            width={'400px'}
                            height={'225px'}
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
                                slices: [{color: '#2176FF'}, {color: '#06D6A0'}, {color: '#FFD166'}, {color: '#118AB2'},{color: '#BF211E'}, {color: '#073B4C'}, {color: '#EF476F'}],    
                                is3D: true,
                                backgroundColor : '#eaebed'
                            }}
                        />
                    )}
                </div>
                <div>
                    {request && (
                    <Chart
                            chartType="PieChart"
                            width={'400px'}
                            height={'225px'}
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
                                slices: [{color: '#2176FF'}, {color: '#06D6A0'}, {color: '#FFD166'}, {color: '#118AB2'},{color: '#BF211E'}, {color: '#073B4C'}, {color: '#EF476F'}],    
                                is3D: true,
                                backgroundColor : '#eaebed'
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
        


}
export default PieChart