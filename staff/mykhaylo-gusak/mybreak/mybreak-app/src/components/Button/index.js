import React from 'react'
import './index.sass'
import '../../../node_modules/bulma/bulma.sass'
const cx = require('classnames');

function Button({ primary, secondary, accept, cancel, register, login, start, click, logOut, next, prev }) {


    const className = cx({
        'g-Button button is-primary is-rounded': primary,
        'g-Button button is-rounded': secondary,
        'g-Button button g-Button--circular': start || next || prev
    })

    const text = cx({
        'Accept': accept,
        'Cancel': cancel,
        'Register': register,
        'Login': login,
        'Start': start,
        'LogOut': logOut,
        'Next': next,
        'Prev': prev

    })

    return (
        <button className={className} onClick={click}>{text}</button>
    )
}

export default Button