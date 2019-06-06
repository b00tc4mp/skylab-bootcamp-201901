import React from 'react'


function Motor({name}){

    return <div className="uk-card uk-card-default uk-card-hover uk-height-small">
        <div className="uk-card-header">
            <h3 className="uk-card-title">{name}</h3>
        </div>
        <div className="uk-card-body">
            <div>
                <input type="range" min="1" max="100" className="slider" id="myRange" />
            </div>
        </div>
    </div>

}

export default Motor