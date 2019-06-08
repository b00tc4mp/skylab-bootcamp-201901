import React from 'react'


function Motor({deviceName, pinNumber, onMotorChange}){

    return <div className="uk-card uk-card-default uk-card-hover uk-height-medium">
        <div className="uk-card-header">
            <h3 className="uk-card-title">Motor{pinNumber}</h3>
        </div>
        <div className="uk-card-body">
            <div className='uk-container'>
                <img className='uk-margin-large-bottom' src="https://img.icons8.com/wired/64/000000/engine.png" />
                <input type="range" min="0" max="100" className="uk-range uk-padding-remove-bottom" id="myRange" onMouseUp={e => onMotorChange(deviceName, pinNumber, e.target.value)} />
            </div>
        </div>
    </div>

}

export default Motor