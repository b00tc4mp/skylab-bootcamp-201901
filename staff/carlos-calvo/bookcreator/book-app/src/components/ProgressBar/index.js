'use strict'

import React from 'react'
import './index.sass'

function ProgressBar(level) {
    const classMod = 'progress-bar w-'.concat(level.level)
    return <div className="progress">
        <div className={classMod} role="progressbar" style="width: 25%" aria-valuenow={level.level} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
}

export default ProgressBar
