'use strict'

import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function feedback() {
    const {feedback}= useContext(AppContext)

    return(
        <p>{feedback}</p>
    )
}