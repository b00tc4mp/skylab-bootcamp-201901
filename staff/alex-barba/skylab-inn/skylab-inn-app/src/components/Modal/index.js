import React, {useContext} from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function Modal() {

    const {showModal, setShowModal, modalMessage, setModalMessage} = useContext(AppContext)

    const visible = showModal ? 'modal display-block' : 'modal display-none'

    const handleCloseModal = () => {
        debugger
        setShowModal(null)
        setModalMessage(null)
    }

    return (
        <div onClick={handleCloseModal} className={visible}>
            <div className='modal__content'>
                <p>{modalMessage}</p>
            </div>     
        </div>
    )
}