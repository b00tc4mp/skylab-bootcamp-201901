import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import literals from './literals'
import logo from './logo/icono_v2.png'

function Header() {
    
    debugger

    const { userLanguage } = useContext(AppContext)

    //const { title } = literals[userLanguage]
   // const { title } = literals['en']

    return <header className="header" onClick={e => e.preventDefault()}>
        <img src={logo} alt="logo-PhotoPin" className='header__logo' />

        <p className='header__title'>Hola</p>

        {/* TODO: Navegación - Profile (si signIn)
                               Logout  (si signIn)
                               Quick start
                               Contact
        */}
    </header>
}

export default Header