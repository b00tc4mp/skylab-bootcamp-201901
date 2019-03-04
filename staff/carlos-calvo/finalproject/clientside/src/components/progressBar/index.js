'use strict'

import React from 'react'
import './index.sass'

function ProgressBar({ level }) {
    return <div className="progress">
        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" aria-valuenow={level} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
}

export default ProgressBar
