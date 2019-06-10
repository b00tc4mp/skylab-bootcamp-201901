import React from "react"
import ReactDOM from "react-dom"
import './index.sass'



export function ConfirmAlert({ onSelectYes,onSelectNo }) {
debugger
    return ReactDOM.createPortal(
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="content" id="messageContainer">
                        <div class="alertMessage">
                        <span class="tag is-warning is-large">Are you sure?</span>
                        <button class="button is-success" id="buttons" onClick={onSelectYes}>Yes</button>
                        <button class="button is-danger" id="buttons" onClick={onSelectNo}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('modal'))
}
