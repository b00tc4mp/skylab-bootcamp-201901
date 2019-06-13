import React from 'react';
import './index.sass'
import Button from '../../components/Button'
import Logo from './Logo'

function Landing() {
    return (
        <section className='g-Landing'>
            <div className='g-Landing__section' >
                <h1 className='g-Landing__section-title'>Breakfast to your needs to take away</h1>
            </div>
            <div className='g-Landing__section' >
                <Logo />
            </div>
            <div className='g-Landing__section' >
                {/* <Button primary={true} start={true} /> */}
            </div>
        </section>
    );
}

export default Landing;