import React from 'react'
import ReactDOM from 'react-dom'

export function Modal({ children, onClose }) {
    return React.DOM.createPortal(
        <div className='f-Modal'>
            <div className='f-Modal-content'>
                <button onClick={onClose}>x</button>
                {children}
            </div>
        </div>
        , document.getElementById('modal')
    )
}