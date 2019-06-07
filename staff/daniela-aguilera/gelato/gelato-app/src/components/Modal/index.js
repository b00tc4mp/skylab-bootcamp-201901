import React from 'react'
import ReactDOM from 'react-dom'

export function Modal ({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className='modal is-active'>
      <div className='modal-background' />
      <div className='modal-content'>
        <div className='box center'>
          {children}
        </div>
      </div>
      <button aria-label='close' className='modal-close is-large ' onClick={onClose}>x</button>
    </div>
    , document.getElementById('modal'))
}
