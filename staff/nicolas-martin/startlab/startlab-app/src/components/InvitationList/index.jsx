import React, { Component } from 'react'
import { toast } from 'react-toastify'

import InvitationItem from '../InvitationItem'
import logic from '../../logic'

class InvitationList extends Component {
  state = { invitations: [] }

  componentDidMount() {
    logic.invitationList()
      .then(invitations => {
        this.setState({ invitations })
      })
      .catch(message => this.emitFeedback(message, 'error'))
  }

  emitFeedback = (message, level) => toast[level](message, {
    position: 'top-right',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })

  handleDelete = (id) => {
    logic.deleteInvitation(id)
      .then(({ message }) =>
        logic.invitationList()
          .then(invitations => {
            this.emitFeedback(message, 'success')
            this.setState({ invitations })
          })
          .catch(message => this.emitFeedback(message, 'error'))
      )
      .catch(message => this.emitFeedback(message, 'error'))
  }

  handleSendEmailInvitation = (id, email) => {

    logic.sendEmailInvitation({ id, email })
      .then(message => {
        logic.invitationList()
          .then(invitations => {
            this.setState({ invitations, message })
          })
          .catch(message => this.emitFeedback(message, 'error'))
      })
  }

  render() {
    const { state: { invitations }, handleDelete, handleSendEmailInvitation, props: { handleNewInvitation } } = this

    return (
      <main className="itemlist invitation-list">
        <div className="itemlist__header course-header group">
          <h1 className="itemlist__header__title subtitle is-4">{invitations.length} invitations</h1>
          <button className="itemlist__header__new button is-link is-warning" onClick={handleNewInvitation}>New</button>
        </div>

        <div className="itemlist__items" >
        
          {invitations.map((invitation, index) => <InvitationItem
            key={index}
            results={invitation}
            onDelete={handleDelete}
            onSendInvitationEmail={handleSendEmailInvitation}
          />)}

        </div>

      </main>
    )
  }
}

export default InvitationList