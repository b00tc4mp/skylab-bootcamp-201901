import React from 'react'

function ServArm({deviceName, servo1, servo2, servo3, onServoChange}){

    return <div className="uk-card uk-height-large uk-card-default uk-card-hover">
        <div className="uk-card-header">
            <h3 className="select-none uk-card-title">Servo Arm</h3>
        </div>
        <div className="uk-card-body">
            <div className='uk-container'>
                <div>
                    <p className="select-none">Servo 1</p>
                    <input type="range" defaultValue="90" min="5" max="175" className="uk-range" id="myRange" onMouseUp={e => onServoChange(deviceName, servo1, e.target.value)} />
                </div>
                <hr className="uk-divider-small"></hr>
                <div>
                    <p className="select-none">Servo 2</p>
                    <input type="range" defaultValue="90" min="5" max="175" className="uk-range" id="myRange" onMouseUp={e => onServoChange(deviceName, servo2, e.target.value)} />
                </div>
                <hr className="uk-divider-small"></hr>
                <div>
                    <p className="select-none">Servo 3</p>
                    <input type="range" defaultValue="90" min="5" max="175" className="uk-range" id="myRange" onMouseUp={e => onServoChange(deviceName, servo3, e.target.value)} />
                </div>
            </div>
        </div>
    </div>

}

export default ServArm