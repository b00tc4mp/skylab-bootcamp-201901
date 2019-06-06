import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return <>
        <p>Sorry, this item doesn't exists</p>
        <Link to="/">Return to the main page</Link>
    </>
}

export default NotFound

