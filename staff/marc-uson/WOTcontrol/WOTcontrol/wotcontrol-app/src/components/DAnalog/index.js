import React from 'react'
import Chart from '../Chart'

function DAnalog({analogData}){

    return <div className="uk-card uk-height-large uk-card-default uk-card-hover">
        <div className="uk-card-header">
            <h3 className="uk-card-title">Analog Input</h3>
        </div>
        <div className="uk-card-body">
            <div className="uk-flex uk-flex-center">
                <Chart analogData={analogData} />
            </div>
        </div>
    </div>

}

export default DAnalog