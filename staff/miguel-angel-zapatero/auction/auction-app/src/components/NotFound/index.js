import React from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

function NotFound() {
    return <div className="uk-text-center uk-margin-large-top notfound ">
        <p className="uk-margin-top">Sorry, this item doesn't exists</p>
        <Link className="uk-button uk-button-primary" to="/">Return to the main page</Link>
    </div>
}

export default NotFound

