import React from 'react'
import ReactDOM from 'react-dom'

export function Modal ({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className='g-Modal'>
      <div className='g-Modal-content'>
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </div>
    , document.getElementById('modal'))
}
