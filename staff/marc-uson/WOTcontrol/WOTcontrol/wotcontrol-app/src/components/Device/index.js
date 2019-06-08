import React, {useEffect} from 'react'
import ServArm from '../ServArm'
import Dout from '../Dout'
import Motor from '../Motor'
import Din from '../Din'
import DAnalog from '../DAnalog'
import Uikit from 'uikit/dist/js/uikit.min.js'

function Device({
    device,
    deviceStatus,
    timeInterval,
    onDeviceDelete,
    onDoutChange,
    onMotorChange,
    onServoChange,
    retrieveInputs
}) {

    useEffect(() => {
        console.log(timeInterval)
        if(timeInterval > 1000){
            const interval = timeInterval
            const retrieveInterval = setInterval(async () => {
                console.log('interval')
                retrieveInputs()
            }, interval);
            return () => clearInterval(retrieveInterval)
        }

    }, [timeInterval]);

    const deleteDevice = (name) =>{
        Uikit.modal('#delete-modal').hide();
        onDeviceDelete(name)
    }

    return <div>
        <div className="uk-container uk-text-center uk-height-1-1 uk-width-1-1 uk-padding-remove-horizontal uk-padding-remove-bottom" >
            <div className='uk-flex uk-flex-middle uk-flex-between'>
                <div>
                    <a ><span className="uk-padding uk-icon-link" data-uk-icon="future"></span></a>
                </div>
                <div>
                    <h2 className='uk-padding-remove uk-margin-remove-bottom'>{device.name}</h2>
                    <p className='uk-text-meta uk-padding-remove-horizontal uk-margin-remove'>{device.ip} - {deviceStatus}</p>
                </div>
                <div>
                    <a data-uk-toggle="target: #delete-modal"><span className="uk-padding uk-icon-link" data-uk-icon="trash"></span></a>
                </div>
            </div>
            <div className="uk-overflow-auto uk-height-large uk-width-1-1">
                <div className="uk-child-width-1-2 uk-text-center" data-uk-grid>
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
                        />
                    </div>
                </div>
                <div className="uk-child-width-1-3 uk-text-center" data-uk-grid>
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
                            values={device.inputs[0].values}
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
                            values={device.inputs[1].values}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div id="delete-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Delete device</h2>
                <p>Are you sure to delete the current device?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button className="uk-button uk-button-danger" type="button" onClick={() => deleteDevice(device.name)} >delete</button>
                </p>
            </div>
        </div>
    </div>

}

export default Device