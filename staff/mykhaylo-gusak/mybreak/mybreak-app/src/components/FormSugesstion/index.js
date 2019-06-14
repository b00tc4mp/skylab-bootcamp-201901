import React from "react"
import './index.sass'
const cx = require('classnames');

function FormSugesstion({register,login, click}) {

    const text = cx({
        'Do you already have a user account? ':register,
        'Are you a new Mybreak user? ':login
    })


    return (
        <div className='g-FormSugesstion'>
            <p>{text}<a onClick={click}>
            {register && 'Log in'}
            {login && 'Sign up'}
            </a></p>
        </div>
    );

}

export default FormSugesstion