import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bulma/bulma.sass'
import './index.sass'
const cx = require('classnames');

function Input({ email, password, name, surname }) {

    const icons = cx({
        'control has-icons-left has-icons-right': email || password,
        'control': name || surname
    })

    const iconLeft = cx({
        'icon is-small is-left': email || password,
        '': name || surname
    })

    const iconRight = cx({
        'icon is-small is-right': email || password,
        '': name || surname
    })

    const placeHolder = cx({
        'Email': email,
        'Password': password,
        'Name': name,
        'Surname': surname
    })

    const type = cx({
        'email': email,
        'password': password,
        'text': name || surname
    })
    const value = cx({
        'email': email,
        'password': password,
        'name': name,
        'surname': surname
    })



    return (
        <div className='g-Input'>
            <div className="field">
                <p className={icons}>
                    <input className="input" type={type} placeholder={placeHolder} name={value} />
                    <span className={iconLeft}>
                        {email && <FontAwesomeIcon icon={faEnvelope} />}
                        {password && <FontAwesomeIcon icon={faLock} />}

                    </span>
                    <span className={iconRight}>
                        {email && <FontAwesomeIcon icon={faCheck} />}
                        {password && <FontAwesomeIcon icon={faCheck} />}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Input;