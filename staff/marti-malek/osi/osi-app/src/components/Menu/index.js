import React from 'react'
import './index.sass'

function Menu({ menuX, menuY, logOut }) {
    return <section className="menu" style={{ top: `${menuX}px`, left: `${menuY}px` }}>
        <div className="menu__item" onClick={() => logOut()}>
            <p>Logout</p>
        </div>
    </section>
}

export default Menu