import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import Order from './Order'
import Title from './Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faUser } from '@fortawesome/free-solid-svg-icons';
import './index.sass'
import '../../../node_modules/bulma/bulma.sass'
const cx = require('classnames');

function UserMenu({ logOut, handleOpenMenu, handleCloseMenu, userMenu, orders, setOrders }) {

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
                <div className='g-UserMenu__header' >
                </div>
                <section className='g-UserMenu__category'>
                    <div className='g-UserMenu__category-title'>
                        <div className='g-UserMenu__category-title-icon'>
                            <FontAwesomeIcon icon={faArchive} />
                        </div>
                        <Title text={'YOUR ORDERS'} />
                    </div>
                    <div className='g-UserMenu__category-products'>
                        {orders && orders.map(elem => {
                            return <Order products={elem.products} date={elem.date} />
                        })
                        }
                    </div>
                </section>
                <a onClick={(e) => {
                    e.stopPropagation()
                    logOut()
                }
                } >Log out</a>
            </div>
        </section>

    );
}

export default UserMenu