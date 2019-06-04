import React from 'react';
import './index.sass'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

function Landing({handleProductsByCategory}) {
        return (
        <section className='g-Landing'>
            <Button start={true} primary={true} click={handleProductsByCategory}/>
        </section>
    );
}

export default Landing;