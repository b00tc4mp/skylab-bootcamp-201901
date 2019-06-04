import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

import './index.scss'

const Spinner = () => {

    const { showSpinner } = useContext(GlobalContext)

    const visible = showSpinner ? `spinner` : 'spinner hidden'

    return (
        <div className={visible}>
            <div className='spinner__content'>
                <span>hello I'm a spinner</span>
            </div>
        </div>
    )
}

export default Spinner
