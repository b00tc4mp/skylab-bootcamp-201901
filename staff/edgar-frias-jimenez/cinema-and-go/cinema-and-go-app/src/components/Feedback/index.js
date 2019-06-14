import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'
import './index.scss'

const Feedback = () => {
    const { feedback } = useContext(GlobalContext)

    return (
        <p className='feedback'>{feedback}</p>
    )
}

export default Feedback
