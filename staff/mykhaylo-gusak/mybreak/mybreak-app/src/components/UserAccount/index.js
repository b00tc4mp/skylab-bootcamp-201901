import React from 'react'
import Button from '../Button'
import Modal from '../Modal'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import '../../../node_modules/bulma/bulma.sass'

function UserAccount({ handleRetrieveUser, showLogin, showRegister, handleUserRegistered, handleCloseRegister, handleOpenLogin, handleOpenRegister, handleCloseLogin }) {

    return (<>
        <div className='g-UserAccount'>
            <Button primary={true} register={true} click={handleOpenRegister} />
            <Button secondary={true} login={true} click={handleOpenLogin} />
        </div>

        {showLogin && <Modal><Login handleRetrieveUser={handleRetrieveUser} handleCloseLogin={handleCloseLogin} handleOpenRegister={handleOpenRegister} /></Modal>}
        {showRegister && <Modal><Register handleCloseRegister={handleCloseRegister} handleUserRegistered={handleUserRegistered} handleOpenLogin={handleOpenLogin} /></Modal>}
    </>);
}

export default UserAccount