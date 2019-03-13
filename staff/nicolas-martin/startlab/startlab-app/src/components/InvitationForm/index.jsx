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
    const { state: { pageTitle, email, feedback }, handleFormSubmit, handleEmailInput } = this

    return (
      <section className="invitation-new">

        <div className="course-header group">
          <h2>{pageTitle}</h2>
          {feedback && <Feedback message={feedback} />}
        </div>

        <form className="invitation-new__form" onSubmit={handleFormSubmit}>

          <div className="control">
            <input className="input is-medium" placeholder="Email" type="email" name="email" onChange={handleEmailInput} value={email} required />          
          </div>

          <button className="invitation-new__form__button button is-info" type="submit">SAVE</button>
        </form>
      </section>
    )
  }
}

export default InvitationForm