import React from 'react'
import ServArm from '../ServArm'
import Dout from '../Dout'
import Motor from '../Motor'
import Din from '../Din'
import DAnalog from '../DAnalog'

function Device(){

    return <div className="uk-container uk-text-center uk-height-1-1 uk-width-1-1 uk-padding-remove-horizontal uk-padding-remove-bottom" >
        <h1>Device</h1>
        <div className="uk-overflow-auto uk-height-large uk-width-1-1">
            <div className="uk-child-width-1-2 uk-text-center" data-uk-grid>
                <div>
                    <ServArm name={'Servo Robot'} />
                </div>
                <div>
                    <DAnalog name={'Analog input'} />
                </div>
            </div>
            <div className="uk-child-width-1-3 uk-text-center" data-uk-grid>
                <div><Dout name={'Digital output 1'}  /></div>
                <div><Motor name={'Motor 1'}  /></div>
                <div><Din name={'Digital input 1'} /></div>
                <div><Dout name={'Digital output 2'}  /></div>
                <div><Motor name={'Motor 2'}  /></div>
                <div><Din name={'Digital input 2'} /></div>
            </div>
        </div>
    </div>

}

export default Device