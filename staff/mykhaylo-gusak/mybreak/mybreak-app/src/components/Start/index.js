import React from 'react'
import Button from '../Button'

import './index.sass'

function Start({handleProductsByCategory}) {
    return(
        <section className='g-Order__Start' >
           <Button className='g-Order__Start-button'  start={true} primary={true} click={handleProductsByCategory}/>
        </section>
    )
}

export default Start