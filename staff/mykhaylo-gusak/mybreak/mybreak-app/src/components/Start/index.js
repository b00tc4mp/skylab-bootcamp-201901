import React from 'react'
import Button from '../Button'
import './index.sass'
import Loader from '../Loader'
import Logo from '../../pages/Landing/Logo'
function Start({ handleProducts, loader }) {
    return (
        <section className='g-Order__Start' >
            {!loader ?
                <>
                    <h1 className='g-Landing__section-title'>Breakfast to your needs to take away</h1>
                    <Logo />
                    <Button className='g-Order__Start-button' start={true} primary={true} click={handleProducts} />
                </>
                :
                <Loader />
            }
        </section>
    )
}

export default Start