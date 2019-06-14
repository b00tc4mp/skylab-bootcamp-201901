import React from "react"
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function CloserX({close}) {
    return (
        <div className='g-CloserX'>
            <div className='g-CloserX__radius'>
                <FontAwesomeIcon icon={faTimes} onClick={close} className='g-CloserX__radius'/>
            </div>
        </div>
    );

}

export default CloserX