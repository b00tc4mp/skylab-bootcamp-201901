import React, { Component } from 'react'

import Feedback from '../Feedback'

import logic from '../../logic'

class InvitationForm extends Component {
  state = { id: '', email: '', status: '', feedback: '', pageTitle: 'New invitation' }

  componentDidMount() {
    if (this.props.id) {
      logic.retrieveInvitation(this.props.id)
        .then(({ id, email, status }) => {
          this.setState({ id, email, status, pageTitle: 'Edit invitation' })
        })
        .catch(message => console.log(message))
    }
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
        .then(message => this.setState({ feedback: message }))
    } catch ({ message }) {
      this.setState({ feedback: message })
    }
  }

  handleNew = () => {
    try {
      const { state: { email }, props: { onNewInvitation } } = this
      logic.newInvitation({ email })
        .then(message => {
          onNewInvitation(message)
        })
        .catch(({ message }) => this.setState({ feedback: message }))
    } catch ({ message }) {
      this.setState({ feedback: message })
    }
  }

  render() {
    const { state: { pageTitle, email, status, feedback }, handleFormSubmit, handleEmailInput } = this

    return (
      <section className="invitation-form">

        <div className="course-header group">
          <h2>{pageTitle}</h2>
          {feedback && <Feedback message={feedback} />}
        </div>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email</label>
          <input id="title" type="email" name="email" onChange={handleEmailInput} value={email} required />

          <p>{status}</p>
          <button type="submit">SAVE</button>
        </form>
      </section>
    )
  }
}

export default InvitationForm