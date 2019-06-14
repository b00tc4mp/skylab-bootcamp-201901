import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

import './index.scss'

const Spinner = () => {

    const { showSpinner } = useContext(GlobalContext)

    const spinnerClasses = showSpinner ? `spinner` : 'spinner hidden'

    return (
        <div className={spinnerClasses}>
            <div className='spinner__content'>
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner
