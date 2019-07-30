import React from 'react'
import literals from './literals'

function Nav({ lang, onLogout, onFavs, onCart, onUser, onHome }) {
    const { logout, favsbutton, cartbutton } = literals[lang]

    return <nav>
        <button onClick={onHome}>Home</button>
        <button onClick={onFavs}>{favsbutton}</button>
        <button onClick={onCart}>{cartbutton}</button>
        <button onClick={onUser}>Perfil</button>
        <button onClick={onLogout}>{logout}</button>
    </nav>
}

export default Nav