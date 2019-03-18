import React, {useContext} from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function Spinner() {

    const {showSpinner} = useContext(AppContext)

    const visible = showSpinner ? `spinner display-block  ` : 'spinner display-none'

    return (
        <div className={visible}>
            <div className={`spinner__content`}>
            <i className='fas fa-spinner fa-pulse'></i>
            </div>     
        </div>
    )
}