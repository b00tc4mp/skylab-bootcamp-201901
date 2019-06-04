import React from 'react'
import Button from '../Button'
import Modal from '../Modal'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import '../../../node_modules/bulma/bulma.sass'

function UserAccount({ showLogin, showRegister, userRegistered, closeRegister, openLogin, openRegister, closeLogin }) {

    return (<>
        <div className='g-UserAccount'>
            <Button primary={true} register={true} click={openRegister} />
            <Button secondary={true} login={true} click={openLogin} />
        </div>

        {showLogin && <Modal><Login closeLogin={closeLogin} /></Modal>}
        {showRegister && <Modal><Register closeRegister={closeRegister} userRegistered={userRegistered} /></Modal>}
    </>);
}

export default UserAccount