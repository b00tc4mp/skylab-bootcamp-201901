import React from 'react';

export default function Modal ({ isShowing, hide }) {

    return (
    isShowing &&
    <div className="modal is-active">
        <div className="modal-background"></div>
            <div className="modal-content">
            <p className="title white is-1">Hello! I'm a Modal toggled with a custom hook!</p>
            </div>
        <button className="modal-close is-large" aria-label="close" onClick={hide}></button>
    </div>
    )
}