import React from 'react'

function DAnalog({name, value}){

    return <div className="uk-card uk-height-medium uk-card-default uk-card-hover">
        <div className="uk-card-header">
            <h3 className="uk-card-title">{name}</h3>
        </div>
        <div className="uk-card-body">
            <div className="field">
                <h1>value: {value}</h1>
            </div>
        </div>
    </div>

}

export default DAnalog