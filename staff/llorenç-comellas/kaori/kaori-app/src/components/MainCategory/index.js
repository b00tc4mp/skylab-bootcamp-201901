import React from 'react'
import './index.scss'

function MainCategory({ onStarter, onPacks, onRolls, onMakis }) {
    return <>
        <div class="columns is-mobile">
            <div class="column" onClick={() => onStarter()}>
                <h3>Entrantes</h3>
                <img className='img-category' src='https://res.cloudinary.com/dme91l7mj/image/upload/v1559641390/kaori/entrantes/noodles-vegetariano.png' alt='Entrantes' />
            </div>
            <div class="column" onClick={() => onPacks()}>
                <h3>Packs</h3>
                <img className='img-category' src='https://res.cloudinary.com/dme91l7mj/image/upload/v1559641601/kaori/packs/family.png' alt='Packs' />
            </div>
        </div>

        <div class="columns is-mobile">
            <div class="column" onClick={() => onRolls()}>
                <h3>Fish-rolls</h3>
                <img className='img-category' src='https://res.cloudinary.com/dme91l7mj/image/upload/v1559641470/kaori/fish-rolls/nagasaki.png' alt='Fish-rolls' />

            </div>
            <div  class="column" onClick={() => onMakis()}>
                <h3>Makis</h3>
                <img className='img-category' src='https://res.cloudinary.com/dme91l7mj/image/upload/v1559641420/kaori/makis/maki-salmon.png' alt='Makis' />

            </div>
        </div>

    </>
}

export default MainCategory