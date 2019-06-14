import React, {useContext} from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function Modal() {

    const {showModal, setShowModal, modalMessage, setModalMessage, modalType} = useContext(AppContext)

    const visible = showModal ? `modal--${modalType} display-block  ` : 'modal display-none'


    const handleCloseModal = () => {
        setShowModal(null)
        setModalMessage(null)
    }

    return (
        <div onClick={handleCloseModal} className={visible}>
            <div className={`modal--${modalType}__content`}>
                <p>{modalMessage}</p>
            </div>     
        </div>
    )
}