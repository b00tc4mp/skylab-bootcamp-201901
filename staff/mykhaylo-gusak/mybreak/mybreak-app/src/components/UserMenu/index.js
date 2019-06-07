import React from 'react'
import logic from '../../logic'

import Button from '../Button'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faUser } from '@fortawesome/free-solid-svg-icons';

import './index.sass'
import '../../../node_modules/bulma/bulma.sass'

const cx = require('classnames');


function UserMenu({ logOut, handleOpenMenu, handleCloseMenu, userMenu, order}) {

    const className1 = cx({
        'g-UserMenu g-UserMenu--opened': userMenu,
        'g-UserMenu': !userMenu
    })

    const className2 = cx({
        'g-UserMenu__menu g-UserMenu__menu--opened': userMenu,
        'g-UserMenu__menu': !userMenu
    })


    return (
        <section className={className1} onClick={handleCloseMenu} >
            <div className={className2}>

                <section className='g-UserMenu__category'>
                    <FontAwesomeIcon icon={faArchive} />
                    <h2>Orders</h2>
                { order && order.map(elem => {
                    debugger
                    return <h1>{elem.date}</h1>
                })}
                </section>

                <section className='g-UserMenu__category'>
                    <FontAwesomeIcon icon={faUser} />
                    <h2>User</h2>

                </section>

                <Button secondary={true} logOut={true} />
            </div>
        </section>

    );
}

export default UserMenu