import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'

export function Modal({ children }) {

    return ReactDOM.createPortal(
        <div className="m-Modal">
            <div className='m-Modal__form' >
                {children}
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal