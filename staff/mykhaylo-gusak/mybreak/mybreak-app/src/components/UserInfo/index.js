import React, { useState } from 'react'
import Button from '../Button'

import '../../../node_modules/bulma/bulma.sass'

function UserInfo({ logOut, user }) {
    const { name, surname, age, card, orders } = user
    return (
        <header className='g-UserInfo'>
            <p>{name}</p>
            <p>{surname}</p>
            <p>{age}</p>
            <p>{card}</p>
            <p>{orders}</p>
            <Button secondary={true} logOut={true} click={logOut} />
        </header>
    );
}

export default UserInfo