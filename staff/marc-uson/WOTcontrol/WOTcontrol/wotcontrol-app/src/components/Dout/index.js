import React from 'react'
import './index.css'

function Dout({name}){

    return <div className="uk-card uk-card-default uk-card-hover uk-height-small">
        <div className="uk-card-header">
            <h3 className="uk-card-title">{name}</h3>
        </div>
        <div className="uk-card-body">
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    </div>

}

export default Dout