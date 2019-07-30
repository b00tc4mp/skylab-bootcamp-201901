import React from 'react'
import Logotip from './logo.svg'
import './index.sass'

function Logo() {

    return (
        <div className='g-logo'>
            <img src={Logotip} className='g-logo-svg'/>
        </div>

    );

}

export default Logo