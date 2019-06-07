import React from 'react';
import './index.sass'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

function Landing({ openRegister, openLogin }) {
    return (
        <section className='g-Landing'>
            {/* <Logo/> */}
            <div className='g-Landing__buttons' >
                <Button primary={true} register={true} click={openRegister} />
                <Button secondary={true} login={true} click={openLogin} />
            </div>
        </section>
    );
}

export default Landing;