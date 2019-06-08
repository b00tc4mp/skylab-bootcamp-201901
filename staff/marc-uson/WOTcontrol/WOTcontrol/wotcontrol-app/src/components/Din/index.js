import React from 'react'

function Din({pinNumber, value}){

    return <div className="uk-card uk-card-default uk-card-hover uk-height-medium">
        <div className="uk-card-header">
            <h3 className="uk-card-title">Din{pinNumber}</h3>
        </div>
        <div className="uk-card-body uk-flex uk-flex-column">
            <div>
                <img src="https://img.icons8.com/wired/64/000000/led-diode.png" />
            </div>
            <h3>ON</h3>
        </div>
    </div>

}

export default Din