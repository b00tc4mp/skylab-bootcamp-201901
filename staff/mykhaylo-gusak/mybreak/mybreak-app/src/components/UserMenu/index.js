import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import Order from './Order'
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

                <section className='g-UserMenu__category'>
                    <div className='g-UserMenu__category-title'>
                        <FontAwesomeIcon icon={faArchive} />
                        <h2>Orders</h2>
                    </div>
                    <div className='g-UserMenu__category-products'>
                        {orders && orders.map(elem => {
                            debugger
                            return <Order products={elem.products} date={elem.date} />
                        })
                        }
                    </div>
                </section>

                <section className='g-UserMenu__category'>
                    <FontAwesomeIcon icon={faUser} />
                    <h2>User</h2>

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