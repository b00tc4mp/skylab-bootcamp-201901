import React, {useEffect} from 'react'
import ServArm from '../ServArm'
import Dout from '../Dout'
import Motor from '../Motor'
import Din from '../Din'
import DAnalog from '../DAnalog'
import './index.css'

function Device({
    device,
    timeInterval,
    onDoutChange,
    onMotorChange,
    onServoChange,
    retrieveInputs,
    analogData,
    din1Data,
    din2Data
}) {

    useEffect(() => {
        let interval
        if(timeInterval > 1000) interval = timeInterval
        else interval = 1000
        const retrieveInterval = setInterval(async () => {
            retrieveInputs()
        }, interval);
        return () => clearInterval(retrieveInterval)


    }, [timeInterval, device]);

    return <div className="container">
        <div className="uk-container uk-text-center uk-width-1-1 uk-padding-small uk-margin-remove" data-uk-scrollspy="cls:uk-animation-fade" >
            <div className="uk-height-1-1 uk-padding-bottom">
                <div className="uk-child-width-1-1 uk-child-width-1-2@s uk-text-center" data-uk-grid>
                    <div>
                        <ServArm
                            deviceName={device.name}
                            servo1={1}
                            servo2={2}
                            servo3={3}
                            onServoChange={onServoChange}
                        />
                    </div>
                    <div>
                        <DAnalog
                            deviceName={device.name}
                            values={device.inputs[2].values}
                            analogData={analogData}
                        />
                    </div>
                </div>
                <div className="uk-child-width-1-1 uk-child-width-1-3@s uk-text-center" data-uk-grid>
                    <div>
                        <Dout
                            deviceName={device.name}
                            pinNumber={1}
                            value={device.outputs[0].value}
                            onDoChange={onDoutChange}
                        />
                    </div>
                    <div>
                        <Motor
                            deviceName={device.name}
                            pinNumber={1}
                            value={device.outputs[5].value}
                            onMotorChange={onMotorChange}
                        />
                    </div>
                    <div>
                        <Din
                            deviceName={device.name}
                            pinNumber={1}
                            dinData={din1Data}
                        />
                    </div>
                    <div>
                        <Dout
                            deviceName={device.name}
                            pinNumber={2}
                            value={device.outputs[1].value}
                            onDoChange={onDoutChange}
                        />
                    </div>
                    <div>
                        <Motor
                            deviceName={device.name}
                            pinNumber={2}
                            value={device.outputs[6].value}
                            onMotorChange={onMotorChange}
                        />
                    </div>
                    <div>
                        <Din
                            deviceName={device.name}
                            pinNumber={2}
                            dinData={din2Data}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Device