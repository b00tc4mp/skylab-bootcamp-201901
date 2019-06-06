import React from "react"
import ReactDOM from "react-dom"



export function Modal({ children, onClose }) {
debugger
    return ReactDOM.createPortal(
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="content">
                        <span>{children}</span>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
        , document.getElementById('modal'))
}


