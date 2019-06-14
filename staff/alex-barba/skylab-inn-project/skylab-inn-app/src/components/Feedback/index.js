import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import './index.sass'

export default function feedback() {
    const { feedback } = useContext(AppContext)

    return (
        <p className='feedback'>{feedback}</p>
    )
}