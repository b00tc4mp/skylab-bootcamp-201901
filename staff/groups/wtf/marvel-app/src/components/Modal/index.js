import React, {Component} from 'react'

class Modal extends Component {

    handleClose = () => {
        const { props: { closeModal } } = this
        closeModal()
    }
    render() {
        const {handleClose} = this

        return <div onClick={handleClose}className="modal is-active">
        <div className="modal-background"></div>
            <div className="modal-content has-text-centered">
                <button className="button is-large is-light is-rounded"><i className="fas fa-check-circle"> </i>&nbsp;&nbsp;You have successfully registered!</button>
        </div>
      </div>
    }
}

export default Modal