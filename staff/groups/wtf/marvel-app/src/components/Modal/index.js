import React, {Component} from 'react'

class Modal extends Component {

    handleClose = () => {
        const { props: { closeModal} } = this
        closeModal()
    }
    render() {
        const {handleClose, props:{modal__feedback }} = this

        return <div onClick={handleClose} className="modal is-active">
        <div className="modal-background"></div>
            <div className="modal-content has-text-centered">
                <button className="button is-large is-light is-rounded"><i className="fas fa-check-circle"></i>&nbsp;&nbsp;{modal__feedback}</button>
        </div>
      </div>
    }
}

export default Modal