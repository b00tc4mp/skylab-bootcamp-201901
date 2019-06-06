import React from 'react'

function Din({name, value}){

    return <div className="uk-card uk-card-default uk-card-hover uk-height-small">
        <div className="uk-card-header">
            <h3 className="uk-card-title">{name}</h3>
        </div>
        <div className="uk-card-body">
            <div className="field">
                <h1>{value}</h1>
            </div>
        </div>
    </div>

}

export default Din