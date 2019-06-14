import React from 'react'
import './index.sass'

function ErrorMessage({ message }) {

    const error = message.slice(message.indexOf('[') + 1, message.indexOf(']'))

    return (<p className='g-ErrorMessage'>{error}</p>)
}

export default ErrorMessage