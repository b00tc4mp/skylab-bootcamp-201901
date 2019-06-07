import React, { useState, useEffect } from 'react'
import ShoppingBasket from '../ShoppingBasket'
import logic from '../../logic'
import './index.sass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import '../../../node_modules/bulma/bulma.sass'

function UserInfo({ user, handleOpenMenu, handleOpenCard }) {

    const { card } = user

    return (
        <header className='g-UserInfo'>
            <div className='g-UserInfo__icon'>
                <FontAwesomeIcon icon={faAlignJustify} onClick={handleOpenMenu} />
            </div>
            <h1 className='g-UserInfo__title'>MyBreakfast</h1>

            <div className='g-UserInfo__icon'>
                {card && <ShoppingBasket card={card} click={handleOpenCard} />}
            </div>
        </header >
    );
}

export default UserInfo