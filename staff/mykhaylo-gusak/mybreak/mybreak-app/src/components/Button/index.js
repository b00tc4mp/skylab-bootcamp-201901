import React from 'react'
import './index.sass'
import '../../../node_modules/bulma/bulma.sass'
const cx = require('classnames');

function Button({ primary, secondary, accept, cancel, register, login, start, click, logOut }) {


    const className = cx({
        'button is-primary is-rounded': primary,
        'button is-rounded': secondary,
        'button g-Button--circular': start
    })

    const text = cx({
        'Accept': accept,
        'Cancel': cancel,
        'Register': register,
        'Login': login,
        'Start': start,
        'LogOut': logOut
    })


    return (
        <button className={className} onClick={click}>{text}</button>
    )
}

export default Button