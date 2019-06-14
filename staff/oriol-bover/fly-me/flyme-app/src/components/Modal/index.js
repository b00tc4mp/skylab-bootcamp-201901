import React from 'react'
import './index.sass'

export default function Modal({ message, onClose, showButtons, onAccept, onCancel }) {

    return (<div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className="modal--body">
                <div className="section has-text-centered">
                    {message}
                </div>
                {showButtons && <div className="buttons is-pulled-right">
                    <button onClick={onCancel} className="button is-danger">Cancel</button>
                    <button onClick={onAccept} className="button is-success">Yes</button>
                </div>}
            </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onClose} ></button>
    </div>)
}