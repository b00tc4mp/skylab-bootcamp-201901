import React, { Component } from 'react'
import { toast } from 'react-toastify'

import logic from '../../logic'

class InvitationForm extends Component {
  state = { id: '', email: '', status: '', pageTitle: 'New invitation' }

  componentDidMount() {
    if (this.props.id) {
      try {
          logic.retrieveInvitation(this.props.id)
          .then(({ id, email, status }) => {
              this.setState({ id, email, status, pageTitle: 'Edit invitation' })
          })
          .catch(message => this.emitFeedback(message, 'error'))
      } catch ({ message }) {
        this.emitFeedback(message, 'error')
      }
    }
  }

  emitFeedback = (message, level) => {
    toast.dismiss()
    return toast[level](message, {
      position: 'top-right',
      autoClose: level !== 'error',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  handleEmailInput = event => this.setState({ email: event.target.value })

  handleFormSubmit = event => {
    event.preventDefault()
    if (this.props.id)
      return this.handleUpdate()
    this.handleNew()
  }


  handleUpdate = () => {
    try {
      const { id, email, status } = this.state
      logic.updateInvitation({ id, email, status })
        .then(message => this.emitFeedback(message, 'success'))
        .catch(message => this.emitFeedback(message, 'error'))
    } catch ({ message }) {
        this.emitFeedback(message, 'error')
    }
  }

  handleNew = () => {
    try {
      const { state: { email }, props: { onNewInvitation } } = this
      logic.newInvitation({ email })
        .then(message => {
          onNewInvitation(message)
        })
        .catch(message => this.emitFeedback(message, 'error'))
    } catch ({ message }) {
        this.emitFeedback(message, 'error')
    }
  }

  render() {
    const { state: { pageTitle, email }, handleFormSubmit, handleEmailInput } = this

    return (
      <section className="invitation-new">

        <div className="course-header group">
          <h2>{pageTitle}</h2>
        </div>

        <form className="invitation-new__form" onSubmit={handleFormSubmit}>

            <input className="input is-medium" placeholder="Email" type="email" name="email" onChange={handleEmailInput} value={email}  autoComplete="off" autoCorrect="off" required />

          <button className="invitation-new__form__button button is-info" type="submit">SAVE</button>
        </form>
      </section>
    )
  }
}

export default InvitationForm