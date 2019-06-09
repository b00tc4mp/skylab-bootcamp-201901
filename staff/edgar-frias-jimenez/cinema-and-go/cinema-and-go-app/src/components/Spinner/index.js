import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

import './index.scss'

const Spinner = () => {

    const { showSpinner } = useContext(GlobalContext)

    const visible = showSpinner ? `spinner` : 'spinner hidden'

    return (
        <div className={visible}>
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
