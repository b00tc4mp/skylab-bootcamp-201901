import React from 'react'
import './index.css'

function Dout({deviceName, pinNumber, value, onDoChange}){

    return <div className="uk-card uk-card-default uk-card-hover uk-height-medium">
        <div className="uk-card-header">
            <h3 className="select-none uk-card-title">Dout{pinNumber}</h3>
        </div>
        <div className="uk-card-body uk-flex uk-flex-column uk-flex.center uk-flex-between">
            <div>
                <img alt='diode' src="https://img.icons8.com/wired/64/000000/led-diode.png" />
            </div>
            <div className="uk-padding-large">
                <label className="switch">
                    <input type="checkbox" onClick={() => onDoChange(deviceName, pinNumber)} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    </div>

}

export default Dout