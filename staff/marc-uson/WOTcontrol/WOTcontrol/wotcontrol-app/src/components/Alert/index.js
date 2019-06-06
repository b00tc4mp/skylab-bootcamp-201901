import React from 'react'
import 'uikit'


function Alert({ error }) {

    return <div className="uk-alert-danger" data-uk-alert>
        <p>{error}</p>
    </div>
}

export default Alert